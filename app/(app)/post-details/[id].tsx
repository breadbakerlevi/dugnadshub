import * as commentApi from "@/api/commentApi";
import * as postApi from "@/api/postApi";
import { useAuthSession } from "@/providers/authctx";
import { postDetailsStyles as styles } from "@/styles/[id].styles";
import { PostComment, PostData } from "@/types/post";
import { statusFilters } from "@/utils/filter";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
export default function PostDetailsPage() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { userNameSession, user } = useAuthSession();
	const [isLoading, setIsLoading] = useState(true);

	const [post, setPost] = useState<PostData | null>(null);
	const [commentText, setCommentText] = useState("");
	const [comments, setComments] = useState<PostComment[]>([]);
	const [isUpdating, setIsUpdating] = useState(false);

	async function fetchCommentsFromApi(ids: string[]) {
		const comments = await commentApi.getCommentsByIds(ids);
		setComments(comments);
	}

	const handleStatusChange = async (
		newStatus: "kommende" | "pågående" | "tidligere"
	) => {
		if (!post || !user || user.uid !== post.authorId) {
			console.log("Kun eieren kan endre status");
			return;
		}

		try {
			await postApi.updatePostStatus(post.id, newStatus);
			setPost({ ...post, status: newStatus });
		} catch (error) {
			console.error("Feil ved endring av status:", error);
		}
	};

	useEffect(() => {
		if (!id) return;

		async function fetchPostData() {
			const post = await postApi.getPostById(id);
			setPost(post);
			setIsLoading(false);

			if (post && post.comments && post.comments.length > 0) {
				await fetchCommentsFromApi(post.comments);
			}
		}

		fetchPostData();
	}, [id]);

	if (isLoading || post === null) {
		return (
			<View style={styles.center}>
				<ActivityIndicator color="#1c411fff" />
				<Text style={styles.loadingText}>Henter innlegg</Text>
			</View>
		);
	}

	const total = post.spots ?? 0;
	const participants = post.participants ?? [];
	const filled = participants.length;
	const remaining = total > 0 ? total - filled : 0;
	const isJoined = !!user && participants.includes(user.uid);

	const handleToggleParticipation = async () => {
		if (!user) {
			console.log("Du må være logget inn for å melde deg på");
			return;
		}
		setIsUpdating(true);
		try {
			await postApi.toggleParticipation(post.id, user.uid);
		} catch (e) {
			console.log("Feil ved oppdatering av påmelding", e);
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<View style={styles.screen}>
			<Stack.Screen
				options={{
					headerTitle: "Dugnad Detaljer",
					headerBackTitle: "Tilbake",
				}}
			/>

			<ScrollView
				style={styles.scroll}
				contentContainerStyle={styles.scrollContent}
			>
				<Image style={styles.imageStyle} source={{ uri: post.imageUri }} />

				<View style={styles.contentContainer}>
					<Text style={styles.titleStyle}>{post.title}</Text>

					{/* Status. Alle brukere ser status men kun den som opprettet dugnaden kan endre */}
					<View style={styles.statusContainer}>
						<View
							style={[
								styles.statusButton,
								post.status === "kommende" && styles.statusButtonFuture,
								post.status === "pågående" && styles.statusButtonCurrent,
								post.status === "tidligere" && styles.statusButtonPrevious,
							]}
						>
							<Text style={styles.statusButtonText}>
								{post.status === "kommende" && "Kommende"}
								{post.status === "pågående" && "Pågående"}
								{post.status === "tidligere" && "Tidligere"}
							</Text>
						</View>

						{/* Kun for oppretter */}
						{user?.uid === post.authorId && (
							<View style={styles.statusSelector}>
								<Text style={styles.statusSelectorLabel}>Endre status:</Text>
								<View style={styles.statusFilterButtons}>
									{statusFilters
										.filter((filter) => filter.value !== "alle")
										.map((filter, index) => (
											<Pressable
												key={filter.value}
												style={[
													styles.statusFilterButton,
													index === 2 && styles.lastStatusFilterButton,
													post.status === filter.value &&
														styles.statusFilterButtonActive,
												]}
												onPress={() =>
													handleStatusChange(
														filter.value as
															| "kommende"
															| "pågående"
															| "tidligere"
													)
												}
											>
												<Text
													style={[
														styles.statusFilterButtonText,
														post.status === filter.value &&
															styles.statusFilterButtonActive,
													]}
												>
													{filter.label}
												</Text>
											</Pressable>
										))}
								</View>
							</View>
						)}
					</View>

					{/* Adresse og kategori */}
					<View style={styles.detailsContainer}>
						{post.address && (
							<Text style={styles.detailsText}>Adresse: {post.address}</Text>
						)}
						{post.category && (
							<Text style={styles.detailsText}>Kategori: {post.category}</Text>
						)}
					</View>

					<Text style={styles.descriptionText}>{post.description}</Text>

					{/* Oppgaver */}
					{post.tasks && post.tasks.length > 0 && (
						<View style={styles.tasksContainer}>
							<Text style={styles.sectionTitle}>Oppgaver</Text>
							{post.tasks.map((task, index) => (
								<View style={styles.taskRow} key={index}>
									<View style={styles.taskBullet} />
									<Text style={styles.taskText}>{task}</Text>
								</View>
							))}
						</View>
					)}
				</View>

				{/* Kommentarer */}
				<View style={styles.commentsContainer}>
					<Text style={styles.sectionTitle}>Kommentarer</Text>
					<View style={styles.commentsList}>
						{comments.length > 0 ? (
							<FlatList
								data={comments}
								renderItem={({ item }) => (
									<View style={styles.commentItem}>
										<View style={styles.commentContent}>
											<Text style={styles.commentAuthor}>{item.author}:</Text>
											<Text style={styles.commentText}>{item.comment}</Text>
										</View>
										{item.authorId === user?.uid && (
											<Pressable
												style={styles.deleteButton}
												onPress={() => {
													commentApi.deleteComment(item.id, post.id);
													setComments(comments.filter((c) => c.id !== item.id));
												}}
											>
												{/* Ikon hentet fra https://icons.expo.fyi/Index */}
												<FontAwesome name="trash-o" size={24} color="color" />
											</Pressable>
										)}
									</View>
								)}
								scrollEnabled={false}
								nestedScrollEnabled={true}
							/>
						) : (
							<Text style={styles.noCommentsText}>Ingen kommentarer enda</Text>
						)}
					</View>
					<View style={styles.addCommentContainer}>
						<TextInput
							value={commentText}
							onChangeText={setCommentText}
							style={styles.commentInput}
							placeholder="Skriv en kommentar..."
							placeholderTextColor="#9ca3af"
						/>
						<Pressable
							style={[
								styles.addCommentButton,
								!commentText.trim() && styles.addCommentButtonDisabled,
							]}
							onPress={() => {
								if (!commentText.trim()) return;
								if (!user || !userNameSession) return;

								const newComment: PostComment = {
									id: commentText,
									authorId: user.uid,
									comment: commentText,
									author: userNameSession,
								};

								commentApi.createComment(newComment, post.id);
								setComments([...comments, newComment]);
								setCommentText("");
							}}
							disabled={!commentText.trim()}
						>
							<Text style={styles.addCommentButtonText}>Legg til</Text>
						</Pressable>
					</View>
				</View>
			</ScrollView>

			{/* Bunnen */}
			{total > 0 && (
				<View style={styles.bottomBar}>
					<View style={styles.placesContainer}>
						<Text style={styles.placesLabel}>Plasser</Text>
						<View style={styles.placesCountBox}>
							<Text style={styles.placesCountText}>
								{filled}/{total}
							</Text>
						</View>
					</View>
					<Pressable
						onPress={handleToggleParticipation}
						disabled={isUpdating || (!isJoined && remaining <= 0)}
						style={[
							styles.joinButton,
							isJoined ? styles.joinButtonSecondary : styles.joinButtonPrimary,
							!isJoined && remaining <= 0 && styles.joinButtonDisabled,
						]}
					>
						<Text
							style={[
								styles.joinButtonText,
								isJoined
									? styles.joinButtonTextSecondary
									: styles.joinButtonTextPrimary,
							]}
						>
							{isJoined ? "Meld av" : remaining <= 0 ? "Fullt" : "Meld på"}
						</Text>
					</Pressable>
				</View>
			)}
		</View>
	);
}
