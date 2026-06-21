import { StyleSheet } from "react-native";

export const postFormModalStyles = StyleSheet.create({
	// Layout
	backdrop: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "center",
	},
	modalCard: {
		backgroundColor: "white",
		marginHorizontal: 16,
		marginVertical: 20,
		borderRadius: 4,
		padding: 20,
		shadowColor: "#00000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	header: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
		color: "#1c411fff",
	},

	// Bilde opplastning
	addImageButton: {
		width: "100%",
		height: 160,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
		borderWidth: 2,
		borderColor: "#d1d5db",
		borderStyle: "dashed",
		marginBottom: 20,
		backgroundColor: "#f9fafb",
		overflow: "hidden",
	},
	imagePlaceholder: {
		alignItems: "center",
		justifyContent: "center",
	},
	plusSign: {
		fontSize: 32,
		fontWeight: "300",
		color: "#6b7280",
		marginBottom: 8,
	},
	imagePlaceholderText: {
		fontSize: 14,
		color: "#6b7280",
	},
	image: {
		width: "100%",
		height: "100%",
	},

	// Skjema
	section: {
		marginBottom: 16,
	},
	label: {
		fontSize: 14,
		fontWeight: "600",
		marginBottom: 8,
		color: "#374151",
	},
	input: {
		borderWidth: 1,
		borderColor: "#d1d5db",
		borderRadius: 4,
		padding: 12,
		fontSize: 16,
		backgroundColor: "white",
	},
	multilineInput: {
		minHeight: 80,
		textAlignVertical: "top",
	},

	// Status
	statusContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 8,
	},
	statusButton: {
		flex: 1,
		borderWidth: 1,
		borderRadius: 4,
		paddingVertical: 10,
		paddingHorizontal: 8,
		alignItems: "center",
		borderColor: "#d1d5db",
		backgroundColor: "#f9fafb",
	},
	statusButtonSelected: {
		borderColor: "#1c411fff",
		backgroundColor: "#1c411fff",
	},
	statusButtonText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#6b7280",
	},
	statusButtonTextSelected: {
		color: "white",
		fontWeight: "600",
	},

	// Kategori
	categoriesContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	categoryChip: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: "#d1d5db",
		backgroundColor: "#f9fafb",
	},
	categoryChipSelected: {
		borderColor: "#1c411fff",
		backgroundColor: "#1c411fff",
	},
	categoryChipText: {
		fontSize: 14,
		color: "#6b7280",
		fontWeight: "500",
	},
	categoryChipTextSelected: {
		color: "white",
		fontWeight: "600",
	},

	// Tasks
	taskRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	radioCircle: {
		width: 16,
		height: 16,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: "#1c411fff",
		marginRight: 12,
	},
	taskInput: {
		flex: 1,
		borderBottomWidth: 1,
		borderColor: "#d1d5db",
		paddingVertical: 6,
		fontSize: 16,
	},

	// Knapper (avbryt + opprett)
	fixedButtonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingBottom: 20,
		paddingTop: 12,
		backgroundColor: "white",
		borderTopWidth: 1,
		borderTopColor: "#e5e7eb",
	},
	button: {
		flex: 1,
		borderRadius: 4,
		paddingVertical: 12,
		alignItems: "center",
		marginHorizontal: 6,
	},
	primaryButton: {
		backgroundColor: "#1c411fff",
	},
	secondaryButton: {
		backgroundColor: "#f3f4f6",
		borderWidth: 1,
		borderColor: "#d1d5db",
	},
	primaryButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	secondaryButtonText: {
		color: "#374151",
		fontSize: 16,
		fontWeight: "600",
	},
});
