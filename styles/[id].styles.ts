import { StyleSheet } from "react-native";

export const postDetailsStyles = StyleSheet.create({
	// View
	screen: {
		flex: 1,
		backgroundColor: "#f8f9fa",
	},
	scroll: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 24,
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f8f9fa",
	},
	loadingText: {
		marginTop: 12,
		fontSize: 16,
		color: "#6b7280",
	},

	// Bilde
	imageStyle: {
		width: "100%",
		height: 300,
	},

	// Main
	contentContainer: {
		backgroundColor: "white",
		marginHorizontal: 16,
		marginTop: 16,
		padding: 20,
		borderRadius: 4,
		shadowColor: "#00000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	titleStyle: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#1f2937",
		marginBottom: 8,
	},

	// Status
	statusContainer: {
		marginBottom: 16,
		gap: 12,
	},
	statusButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 4,
		backgroundColor: "#f3f4f6",
		alignSelf: "flex-start",
	},
	statusButtonFuture: {
		backgroundColor: "#dbeafe",
	},
	statusButtonCurrent: {
		backgroundColor: "#fef3c7",
	},
	statusButtonPrevious: {
		backgroundColor: "#f2dfe5",
	},
	statusButtonText: {
		fontSize: 14,
		fontWeight: "600",
		color: "#374151",
	},
	statusSelector: {
		marginTop: 8,
	},
	statusSelectorLabel: {
		fontSize: 12,
		fontWeight: "500",
		color: "#6b7280",
		marginBottom: 6,
		textTransform: "uppercase",
	},

	// Status filter
	statusFilterButtons: {
		flexDirection: "row",
		gap: 8,
	},
	statusFilterButton: {
		flex: 1,
		paddingVertical: 8,
		borderRadius: 4,
		backgroundColor: "#f3f4f6",
		borderWidth: 1,
		borderColor: "#d1d5db",
		alignItems: "center",
		justifyContent: "center",
	},
	lastStatusFilterButton: {},
	statusFilterButtonActive: {
		backgroundColor: "#1c411fff",
		borderColor: "#1c411fff",
	},
	statusFilterButtonText: {
		fontSize: 13,
		color: "#374151",
		fontWeight: "500",
	},
	statusFilterButtonTextActive: {
		color: "white",
	},

	// Detaljer
	detailsContainer: {
		marginBottom: 16,
		gap: 6,
	},
	detailsText: {
		fontSize: 14,
		color: "#6b7280",
		fontWeight: "500",
	},
	descriptionText: {
		fontSize: 16,
		color: "#4b5563",
		marginBottom: 16,
	},

	// Tasks
	tasksContainer: {
		borderTopWidth: 1,
		borderTopColor: "#e5e7eb",
		paddingTop: 16,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#374151",
		marginBottom: 12,
	},
	taskRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 12,
		paddingVertical: 6,
	},
	taskBullet: {
		width: 6,
		height: 6,
		borderRadius: 4,
		backgroundColor: "#1c411fff",
		marginTop: 8,
	},
	taskText: {
		flex: 1,
		fontSize: 16,
		color: "#4b5563",
	},

	// Kommentarer
	commentsContainer: {
		backgroundColor: "white",
		marginHorizontal: 16,
		marginTop: 16,
		padding: 20,
		borderRadius: 4,
		shadowColor: "#00000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	commentsList: {
		maxHeight: 200,
		marginBottom: 16,
	},
	commentItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#f3f4f6",
	},
	commentContent: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 6,
	},
	commentAuthor: {
		fontSize: 14,
		fontWeight: "600",
		color: "#374151",
	},
	commentText: {
		flex: 1,
		fontSize: 14,
		color: "#4b5563",
	},
	deleteButton: {
		padding: 4,
	},
	noCommentsText: {
		fontSize: 14,
		color: "#9ca3af",
		fontStyle: "italic",
		textAlign: "center",
		paddingVertical: 20,
	},

	// Legg til kommentar
	addCommentContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	commentInput: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#d1d5db",
		borderRadius: 4,
		padding: 12,
		fontSize: 16,
		backgroundColor: "white",
	},
	addCommentButton: {
		backgroundColor: "#1c411fff",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 4,
	},
	addCommentButtonDisabled: {
		backgroundColor: "#9ca3af",
	},
	addCommentButtonText: {
		color: "white",
		fontSize: 14,
		fontWeight: "600",
	},

	// Bottom bar + meld på/av
	bottomBar: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 16,
		backgroundColor: "white",
		borderTopWidth: 1,
		borderTopColor: "#e5e7eb",
		shadowColor: "#00000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	placesContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	placesLabel: {
		fontSize: 14,
		fontWeight: "600",
		color: "#374151",
	},
	placesCountBox: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: "#f3f4f6",
		borderRadius: 4,
		minWidth: 60,
		alignItems: "center",
	},
	placesCountText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#374151",
	},
	joinButton: {
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 4,
		minWidth: 120,
		alignItems: "center",
	},
	joinButtonPrimary: {
		backgroundColor: "#1c411fff",
	},
	joinButtonSecondary: {
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: "#d1d5db",
	},
	joinButtonDisabled: {
		backgroundColor: "#9ca3af",
	},
	joinButtonText: {
		fontSize: 16,
		fontWeight: "600",
	},
	joinButtonTextPrimary: {
		color: "white",
	},
	joinButtonTextSecondary: {
		color: "#374151",
	},
});
