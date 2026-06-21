import { useAuthSession } from "@/providers/authctx";
import { postStyles as styles } from "@/styles/post.styles";
import { PostData } from "@/types/post";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

type PostProps = {
	postData: PostData;
	onLikePress?: (postId: string) => void;
	onFavoritePress?: (postId: string) => void;
	onCommentPress?: (postId: string) => void;
};

export default function Post({
	postData,
	onLikePress,
	onCommentPress,
	onFavoritePress,
}: PostProps) {
	const { user } = useAuthSession();
	const isUserPost = postData.authorId === user?.uid;

	const total = postData.spots ?? 0;
	const participants = postData.participants ?? [];
	const filled = participants.length;

	const handlePress = () => {
		router.push({
			pathname: "/(app)/post-details/[id]",
			params: { id: postData.id },
		});
	};

	return (
		<Pressable onPress={handlePress}>
			<View style={styles.container}>
				<Text style={styles.title}>{postData.title}</Text>

				<View style={styles.contentRow}>
					{postData.imageUri && (
						<Image source={{ uri: postData.imageUri }} style={styles.image} />
					)}
					<Text style={styles.description} numberOfLines={4}>
						{postData.description}
					</Text>
				</View>

				<View style={styles.interactionContainer}>
					{isUserPost && (
						<View style={styles.interactionItem}>
							<Ionicons name="person" size={16} color="#1c411fff" />
							<Text style={styles.interactionText}>Din dugnad</Text>
						</View>
					)}

					{/* Plasser */}
					{total > 0 && (
						<View style={styles.interactionItem}>
							<Ionicons name="people" size={16} color="#666" />
							<Text style={styles.interactionCount}>
								{filled}/{total}
							</Text>
						</View>
					)}

					{/* Favoritt-knapp */}
					{!isUserPost && (
						<Pressable
							style={styles.interactionItem}
							onPress={() => onFavoritePress?.(postData.id)}
						>
							{/* Ikon hentet fra https://icons.expo.fyi/Index */}
							<Ionicons
								name={postData.isFavorited ? "star" : "star-outline"}
								size={16}
								color={postData.isFavorited ? "#ffd900ff" : "#666"}
							/>
							<Text style={styles.interactionText}>
								{postData.isFavorited ? "Fjern" : "Lagre"}
							</Text>
						</Pressable>
					)}

					{/* Like-knapp */}
					<Pressable
						style={styles.interactionItem}
						onPress={() => onLikePress?.(postData.id)}
					>
						{/* Ikon hentet fra https://icons.expo.fyi/Index */}
						<Ionicons
							name={postData.isLiked ? "thumbs-up" : "thumbs-up-outline"}
							size={16}
							color={postData.isLiked ? "#1c411fff" : "#666"}
						/>
						<Text style={styles.interactionCount}>{postData.likes || 0}</Text>
					</Pressable>

					{/* Kommentar-knapp */}
					<Pressable
						style={styles.interactionItem}
						onPress={() => onCommentPress?.(postData.id)}
					>
						{/* Ikon hentet fra https://icons.expo.fyi/Index */}
						<Ionicons name="chatbubble-outline" size={16} color="#666" />
						<Text style={styles.interactionCount}>
							{postData.commentCount || postData.comments?.length || 0}
						</Text>
					</Pressable>
				</View>
			</View>
		</Pressable>
	);
}
