import * as postApi from "@/api/postApi";
import { useAuthSession } from "@/providers/authctx";
import { postFormModalStyles as styles } from "@/styles/postformmodal";
import { PostData } from "@/types/post";
import { categories } from "@/utils/filter";
import { useState } from "react";
import {
	ActivityIndicator,
	Image,
	Modal,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import SelectImageModal from "./SelectImageModal";

export type PostModalProps = {
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
	confirmPostAdded: VoidFunction;
};

type PostStatus = "kommende" | "pågående" | "tidligere";

export default function PostFormModal({
	isVisible,
	setIsVisible,
	confirmPostAdded,
}: PostModalProps) {
	const [titleText, setTitleText] = useState("");
	const [descText, setDescText] = useState("");
	const [addressText, setAddressText] = useState("");
	const [status, setStatus] = useState<PostStatus>("kommende");
	const [categoryText, setCategoryText] = useState("");
	const [spotsText, setSpotsText] = useState("");
	const [tasks, setTasks] = useState<string[]>([""]);
	const [isCameraOpen, setIsCameraOpen] = useState(false);
	const [image, setImage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const { user } = useAuthSession();

	// Brukte denne som referanse og inspirasjon:
	// https://avanibataviya.medium.com/add-or-remove-input-fields-dynamically-with-react-hooks-df37b96a9e38
	const handleTaskChange = (text: string, index: number) => {
		const data = [...tasks];

		data[index] = text;

		if (index === data.length - 1 && text.trim().length > 0) {
			data.push("");
		}

		while (
			data.length > 1 &&
			data[data.length - 1].trim() === "" &&
			data[data.length - 2].trim() === ""
		) {
			data.pop();
		}

		setTasks(data);
	};

	const resetForm = () => {
		setTitleText("");
		setDescText("");
		setAddressText("");
		setStatus("kommende");
		setCategoryText("");
		setSpotsText("");
		setTasks([""]);
		setImage(null);
	};

	const handleCreatePost = async () => {
		if (!image) return;

		setIsLoading(true);

		const filledTasks = tasks.filter((t) => t.trim().length > 0);

		const newPost: PostData = {
			id: titleText + descText,
			authorId: user?.uid ?? "ERROR",
			title: titleText,
			description: descText,
			imageUri: image,
			createdAt: new Date(),

			address: addressText,
			category: categoryText,
			status: status,
			spots: spotsText.trim().length > 0 ? Number(spotsText.trim()) : undefined,
			tasks: filledTasks,
			participants: [],

			isLiked: false,
			likes: 0,
			comments: [],
			commentCount: 0,
			isFavorited: false,
		};

		await postApi.createPost(newPost);

		resetForm();
		confirmPostAdded();
		setIsVisible(false);
		setIsLoading(false);
	};

	const StatusButton = ({
		statusValue,
		label,
	}: {
		statusValue: PostStatus;
		label: string;
	}) => (
		<Pressable
			style={[
				styles.statusButton,
				status === statusValue && styles.statusButtonSelected,
			]}
			onPress={() => setStatus(statusValue)}
		>
			<Text
				style={[
					styles.statusButtonText,
					status === statusValue && styles.statusButtonTextSelected,
				]}
			>
				{label}
			</Text>
		</Pressable>
	);

	const CategoryChip = ({ category }: { category: string }) => (
		<Pressable
			style={[
				styles.categoryChip,
				categoryText === category && styles.categoryChipSelected,
			]}
			onPress={() => setCategoryText(category)}
		>
			<Text
				style={[
					styles.categoryChipText,
					categoryText === category && styles.categoryChipTextSelected,
				]}
			>
				{category}
			</Text>
		</Pressable>
	);

	return (
		<Modal transparent visible={isVisible} animationType="slide">
			<Modal visible={isCameraOpen} animationType="slide">
				<SelectImageModal
					closeModal={() => setIsCameraOpen(false)}
					setImage={(imageUri) => {
						setImage(imageUri);
					}}
				/>
			</Modal>

			<View style={styles.backdrop}>
				<ScrollView
					contentContainerStyle={styles.scrollContainer}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.modalCard}>
						<Text style={styles.header}>Opprett dugnad</Text>

						<Pressable
							onPress={() => setIsCameraOpen(true)}
							style={styles.addImageButton}
						>
							{image ? (
								<Image
									source={{ uri: image }}
									style={styles.image}
									resizeMode="cover"
								/>
							) : (
								<View style={styles.imagePlaceholder}>
									<Text style={styles.plusSign}>+</Text>
									<Text style={styles.imagePlaceholderText}>
										Legg til bilde
									</Text>
								</View>
							)}
						</Pressable>

						{isLoading ? (
							<ActivityIndicator size="large" color="#1c411fff" />
						) : (
							<>
								<View style={styles.section}>
									<Text style={styles.label}>Tittel</Text>
									<TextInput
										style={styles.input}
										value={titleText}
										placeholder="Tittel på dugnaden"
										onChangeText={setTitleText}
									/>
								</View>

								<View style={styles.section}>
									<Text style={styles.label}>Status</Text>
									<View style={styles.statusContainer}>
										<StatusButton statusValue="kommende" label="Kommende" />
										<StatusButton statusValue="pågående" label="Pågående" />
										<StatusButton statusValue="tidligere" label="Tidligere" />
									</View>
								</View>

								<View style={styles.section}>
									<Text style={styles.label}>Kategori</Text>
									<View style={styles.categoriesContainer}>
										{categories.map((category) => (
											<CategoryChip key={category} category={category} />
										))}
									</View>
								</View>

								<View style={styles.section}>
									<Text style={styles.label}>Antall plasser</Text>
									<TextInput
										style={styles.input}
										placeholder="Antall plasser"
										value={spotsText}
										onChangeText={setSpotsText}
										keyboardType="numeric"
									/>
								</View>

								<View style={styles.section}>
									<Text style={styles.label}>Adresse</Text>
									<TextInput
										style={styles.input}
										value={addressText}
										placeholder="Adresse..."
										onChangeText={setAddressText}
									/>
								</View>

								<View style={styles.section}>
									<Text style={styles.label}>Beskrivelse</Text>
									<TextInput
										style={[styles.input, styles.multilineInput]}
										value={descText}
										placeholder="Kort beskrivelse av dugnaden..."
										onChangeText={setDescText}
										multiline
										numberOfLines={3}
									/>
								</View>

								<View style={styles.section}>
									<Text style={styles.label}>Gjøremål</Text>
									{tasks.map((task, index) => (
										<View style={styles.taskRow} key={index}>
											<View style={styles.radioCircle} />
											<TextInput
												style={styles.taskInput}
												placeholder="Beskriv gjøremål..."
												value={task}
												onChangeText={(text) => handleTaskChange(text, index)}
											/>
										</View>
									))}
								</View>
							</>
						)}
					</View>
				</ScrollView>

				{/* Statiske knapper */}
				<View style={styles.fixedButtonContainer}>
					<Pressable
						onPress={() => {
							resetForm();
							setIsVisible(false);
						}}
						style={[styles.button, styles.secondaryButton]}
					>
						<Text style={styles.secondaryButtonText}>Avbryt</Text>
					</Pressable>

					<Pressable
						style={[styles.button, styles.primaryButton]}
						onPress={handleCreatePost}
					>
						<Text style={styles.primaryButtonText}>Opprett dugnad</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}
