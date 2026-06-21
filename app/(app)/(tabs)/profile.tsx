import * as postApi from "@/api/postApi";
import * as userApi from "@/api/userApi";
import Post from "@/components/Post";
import { useAuthSession } from "@/providers/authctx";
import { profileStyles as styles } from "@/styles/profile.styles";
import { PostData } from "@/types/post";
import { UserData } from "@/types/user";
import { createRefreshControl, useRefresh } from "@/utils/refresh";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function ProfilePage() {
  const { user, userNameSession, signOut } = useAuthSession();
  const [userProfile, setUserProfile] = useState<UserData | null>(null);
  const [userPosts, setUserPosts] = useState<PostData[]>([]);
  const [allPosts, setAllPosts] = useState<PostData[]>([]);
  const [favoritePostIds, setFavoritePostIds] = useState<string[]>([]);
  const { isRefreshing, setIsRefreshing } = useRefresh();
  const [selectedView, setSelectedView] = useState("alle");
  const [selectedStatus, setSelectedStatus] = useState("alle");

  async function loadData() {
    setIsRefreshing(true);
    if (!user) {
      Alert.alert("Du er ikke logget inn!");
      setIsRefreshing(false);
      return;
    }

    try {
      let userData = await userApi.getUserProfile(user.uid);

      if (!userData) {
        const newUserProfile: UserData = {
          name: userNameSession || "Bruker",
          email: user?.email || "",
        };
        await userApi.createUserProfile(user.uid, newUserProfile);
        userData = newUserProfile; 
      }

      setUserProfile(userData);

      const [allPostsFromApi, favoritePostIds, userPosts] = await Promise.all([
        postApi.getAllPosts(),
        postApi.getUserFavorites(user.uid),
        postApi.getPostsForUser(user.uid),
      ]);

      setFavoritePostIds(favoritePostIds);

      const allPostsWithFavorites = allPostsFromApi.map((post) => ({
        ...post,
        isFavorited: favoritePostIds.includes(post.id),
      }));

      const userPostsWithFavorites = userPosts.map((post) => ({
        ...post,
        isFavorited: favoritePostIds.includes(post.id),
      }));

      setAllPosts(allPostsWithFavorites);
      setUserPosts(userPostsWithFavorites);
    } catch (error) {
      console.error("Error loading profile data:", error);
    } finally {
      setIsRefreshing(false);
    }
  }

  const handleLikePost = async (postId: string) => {
    try {
      const updatePost = (post: PostData) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked
                ? (post.likes || 0) - 1
                : (post.likes || 0) + 1,
            }
          : post;

      setUserPosts((posts) => posts.map(updatePost));
      setAllPosts((posts) => posts.map(updatePost));
    } catch (error) {
      console.error("Feil ved liking av innlegg:", error);
    }
  };

  const handleFavoritePress = async (postId: string) => {
    if (!user) return;

    try {
      const newStatus = await postApi.toggleFavorite(postId, user.uid);

      setFavoritePostIds((prev) => {
        if (newStatus) {
          return [...prev, postId]; 
        } else {
          return prev.filter((id) => id !== postId); 
        }
      });

      const updatePost = (post: PostData) =>
        post.id === postId ? { ...post, isFavorited: newStatus } : post;

      setUserPosts((posts) => posts.map(updatePost));
      setAllPosts((posts) => posts.map(updatePost));
    } catch (error) {
      console.error("Feil ved favoritt:", error);
    }
  };

  const handleCommentPress = (postId: string) => {
    console.log("Comment pressed for post:", postId);
  };

  useEffect(() => {
    loadData();
  }, []);

  const getPostsToShow = () => {
    if (!user) return [];

    let postsToShow = [];

    // Først filtrer på view (Alle, Favoritter, Mine)
    switch (selectedView) {
      case "mine":
        postsToShow = userPosts;
        break;
      case "favoritter":
        postsToShow = allPosts.filter((post) => favoritePostIds.includes(post.id));
        break;
      case "alle":
      default:
        postsToShow = allPosts.filter(
          (post) =>
            post.authorId === user.uid ||
            post.participants?.includes(user.uid) ||
            favoritePostIds.includes(post.id)
        );
        break;
    }

    // Deretter filtrer på status, hvis ikke "alle"
    if (selectedStatus !== "alle") {
      postsToShow = postsToShow.filter(post => post.status === selectedStatus);
    }

    return postsToShow;
  };

  const filteredPosts = getPostsToShow();

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerTitle: "Profil",
          headerRight: () => (
            <Pressable style={styles.logoutButton} onPress={signOut}>
              <Text style={styles.logoutButtonText}>Logg ut</Text>
            </Pressable>
          ),
        }}
      />

      {/* Header */}
      <View style={styles.topSection}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>
            Hei, {userNameSession || "Bruker"}!
          </Text>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.sectionLabel}>Vis</Text>
          <FilterButtons
            options={["Alle", "Favoritter", "Mine"]}
            selected={selectedView}
            onSelect={setSelectedView}
          />
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.sectionLabel}>Status</Text>
          <FilterButtons
            options={["Alle", "Kommende", "Pågående", "Tidligere"]}
            selected={selectedStatus}
            onSelect={setSelectedStatus}
          />
        </View>
      </View>

      {/* Listevisning */}
      <ScrollView
        refreshControl={
          <RefreshControl {...createRefreshControl(isRefreshing, loadData)} />
        }
        contentContainerStyle={
          filteredPosts.length === 0
            ? styles.emptyListContent
            : styles.listContent
        }
      >
        {filteredPosts.length > 0 ? (
          <View style={styles.postsListContainer}>
            {filteredPosts.map((post) => (
              <Post
                key={post.id}
                postData={post}
                onLikePress={handleLikePost}
                onFavoritePress={handleFavoritePress}
                onCommentPress={handleCommentPress}
              />
            ))}
          </View>
        ) : (
          <View style={styles.noPostsContainer}>
            <Text style={styles.noPostsText}>
              {selectedView === "favoritter"
                ? `Ingen favoritter enda`
                : selectedView === "mine"
                ? `Du har ingen dugnader enda`
                : `Ingen dugnader enda`}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const FilterButtons = ({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) => (
  <View style={styles.filterButtons}>
    {options.map((option, index) => (
      <Pressable
        key={option}
        style={[
          styles.filterButton,
          index === options.length - 1 && styles.filterButtonLast,
          selected.toLowerCase() === option.toLowerCase() &&
            styles.filterButtonActive,
        ]}
        onPress={() => onSelect(option.toLowerCase())}
      >
        <Text
          style={[
            styles.filterButtonText,
            selected.toLowerCase() === option.toLowerCase() &&
              styles.filterButtonTextActive,
          ]}
        >
          {option}
        </Text>
      </Pressable>
    ))}
  </View>
);