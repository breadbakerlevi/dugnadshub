import * as postApi from "@/api/postApi";
import FilterModal from "@/components/FilterModal";
import Post from "@/components/Post";
import PostFormModal from "@/components/PostFormModal";
import { useAuthSession } from "@/providers/authctx";
import { indexStyles as styles } from "@/styles/index.styles";
import { PostData } from "@/types/post";
import {
	FilterState,
	defaultFilterState,
	hasActiveFilters,
	resetFilters,
} from "@/utils/filter";
import { createRefreshControl, useRefresh } from "@/utils/refresh";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
	FlatList,
	Pressable,
	RefreshControl,
	Text,
	TextInput,
	View,
} from "react-native";

export default function HomeScreen() {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
	const [posts, setPosts] = useState<PostData[]>([]);
	const { user, userNameSession } = useAuthSession();
	const [filters, setFilters] = useState<FilterState>(defaultFilterState);
	const { isRefreshing, setIsRefreshing } = useRefresh();

	async function getPostsFromApi() {
		setIsRefreshing(true);
		const posts = await postApi.getAllPosts();
		setPosts(posts);
		setIsRefreshing(false);
	}

	async function getFilteredPosts() {
		setIsRefreshing(true);

		const filterParameters: any = {};

		if (filters.searchText && filters.searchText.trim() !== "") {
			filterParameters.searchText = filters.searchText;
		}

		if (filters.selectedCategories.length > 0) {
			filterParameters.categories = filters.selectedCategories;
		}

		if (filters.statusFilter && filters.statusFilter !== "alle") {
			filterParameters.statusFilter = filters.statusFilter;
		}

		if (filters.showMyPosts && user) {
			filterParameters.authorId = user.uid;
		}

		if (filters.showJoinedPosts && user) {
			filterParameters.participantId = user.uid;
		}

		const hasActiveFilters =
			filters.searchText ||
			filters.selectedCategories.length > 0 ||
			filters.statusFilter !== "alle" ||
			filters.showMyPosts ||
			filters.showJoinedPosts;

		const posts = hasActiveFilters
			? await postApi.getFilteredPosts(filterParameters)
			: await postApi.getAllPosts();

		setPosts(posts);
		setIsRefreshing(false);
	}

	// Funksjon for å like/ulike et innlegg
	// Den funker ikke som den skal. Den oppdaterer seg ikke dynamisk i både index og profil..
	const handleLikePost = async (postId: string) => {
		try {
			setPosts((currentPosts) =>
				currentPosts.map((post) => {
					if (post.id === postId) {
						const isCurrentlyLiked = post.isLiked || false;
						const currentLikes = post.likes || 0;

						return {
							...post,
							isLiked: !isCurrentlyLiked,
							likes: isCurrentlyLiked ? currentLikes - 1 : currentLikes + 1,
						};
					}
					return post;
				})
			);
		} catch (error) {
			console.error("Feil ved liking av innlegg:", error);
		}
	};

	const handleCommentPress = (postId: string) => {
		console.log("Comment pressed for post:", postId);
	};

	const handleFavoritePress = async (postId: string) => {
		if (!user) return;

		try {
			const newStatus = await postApi.toggleFavorite(postId, user.uid);

			setPosts((currentPosts) =>
				currentPosts.map((post) =>
					post.id === postId ? { ...post, isFavorited: newStatus } : post
				)
			);
		} catch (error) {
			console.error("Feil ved favoritt:", error);
		}
	};

	// Filter-funksjoner
	const handleResetFilters = () => {
		setFilters(resetFilters());
		getPostsFromApi();
	};

	const activeFilters = hasActiveFilters(filters);

	useEffect(() => {
		const delayBounce = setTimeout(() => {
			getFilteredPosts();
		}, 800);
		return () => clearTimeout(delayBounce);
	}, [
		filters.searchText,
		filters.selectedCategories,
		filters.showMyPosts,
		filters.showJoinedPosts,
		filters.statusFilter,
	]);

	useEffect(() => {
		getPostsFromApi();
	}, []);

	return (
		<View style={styles.mainContainer}>
			<Stack.Screen
				options={{
					headerTitle: "DugnadsHub",
				}}
			/>

			<PostFormModal
				isVisible={isModalVisible}
				setIsVisible={setIsModalVisible}
				confirmPostAdded={async () => {
					await getPostsFromApi();
				}}
			/>

			<FilterModal
				visible={isFilterModalVisible}
				onClose={() => setIsFilterModalVisible(false)}
				filters={filters}
				onFiltersChange={setFilters}
				onApplyFilters={() => {
					getFilteredPosts();
					setIsFilterModalVisible(false);
				}}
				onResetFilters={handleResetFilters}
			/>

			<View style={styles.utilityBar}>
				<Pressable
					style={[
						styles.filterButton,
						activeFilters && styles.filterButtonActive,
					]}
					onPress={() => setIsFilterModalVisible(true)}
				>
					{/* Ikon hentet fra https://icons.expo.fyi/Index */}
					<Ionicons
						name="filter-sharp"
						size={20}
						color={activeFilters ? "white" : "#1c411fff"}
					/>
				</Pressable>

				<View style={styles.searchContainer}>
					<TextInput
						style={styles.searchInput}
						value={filters.searchText}
						onChangeText={(text) =>
							setFilters((prev) => ({ ...prev, searchText: text }))
						}
						placeholder="Søk etter dugnader..."
					/>
				</View>

				<Pressable
					style={styles.plusButton}
					onPress={() => {
						if (!userNameSession) {
							console.log("Du må være logget inn for å opprette en dugnad");
							return;
						}
						setIsModalVisible(true);
					}}
				>
					<Text style={styles.plusButtonText}>+</Text>
				</Pressable>
			</View>

			<FlatList
				data={posts}
				refreshControl={
					<RefreshControl
						{...createRefreshControl(isRefreshing, getFilteredPosts)}
					/>
				}
				contentContainerStyle={styles.listContent}
				ItemSeparatorComponent={() => <View style={{ height: 12 }}></View>}
				renderItem={({ item }) => (
					<Post
						postData={item}
						onLikePress={handleLikePost}
						onCommentPress={handleCommentPress}
						onFavoritePress={handleFavoritePress}
					/>
				)}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>
							{filters.showJoinedPosts
								? "Ingen påmeldte dugnader"
								: filters.showMyPosts
								? "Du har ikke opprettet noen dugnader enda"
								: "Ingen dugnader funnet"}
						</Text>
						<Text style={styles.emptySubtext}>
							{filters.showJoinedPosts
								? "Finn en dugnad og meld deg på!"
								: filters.showMyPosts
								? "Opprett din første dugnad!"
								: userNameSession
								? "Opprett den første dugnaden!"
								: "Logg inn for å se dugnader"}
						</Text>
					</View>
				}
			/>
		</View>
	);
}
