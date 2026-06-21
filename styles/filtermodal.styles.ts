import { StyleSheet } from "react-native";

export const filterModalStyles = StyleSheet.create({
	// Layout
	filterModalBackdrop: {
		flex: 1,
		backgroundColor: "#00000080",
		justifyContent: "flex-end",
	},
	filterModalContent: {
		backgroundColor: "white",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 20,
		maxHeight: "80%",
	},
	filterModalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
		color: "#1c411fff",
	},

	// Filter
	filterSection: {
		marginBottom: 20,
	},
	filterSectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 10,
		color: "#374151",
	},

	// Kategori filter
	categoriesContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 6,
	},
	categoryChip: {
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 4,
		backgroundColor: "#f3f4f6",
		borderWidth: 1,
		borderColor: "#d1d5db",
		marginBottom: 4,
	},
	categoryChipSelected: {
		backgroundColor: "#1c411fff",
		borderColor: "#1c411fff",
	},
	categoryChipText: {
		fontSize: 12,
		color: "#374151",
		fontWeight: "500",
	},
	categoryChipTextSelected: {
		color: "white",
	},

	// Status filter
	statusFiltersContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 6,
	},
	statusFilterChip: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 4,
		backgroundColor: "#f3f4f6",
		borderWidth: 1,
		borderColor: "#d1d5db",
	},
	statusFilterChipSelected: {
		backgroundColor: "#1c411fff",
		borderColor: "#1c411fff",
	},
	statusFilterChipText: {
		fontSize: 14,
		color: "#374151",
		fontWeight: "500",
	},
	statusFilterChipTextSelected: {
		color: "white",
	},

	// Checkbox filter
	checkboxRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	checkbox: {
		width: 20,
		height: 20,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: "#d1d5db",
		marginRight: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	checkboxSelected: {
		backgroundColor: "#1c411fff",
		borderColor: "#1c411fff",
	},
	checkboxLabel: {
		fontSize: 16,
		color: "#374151",
	},

	// Bunnknappene (Nullstill/bruk)
	filterButtonsContainer: {
		flexDirection: "row",
		gap: 12,
		marginTop: 20,
	},
	filterButtonPrimary: {
		flex: 1,
		backgroundColor: "#1c411fff",
		padding: 16,
		borderRadius: 4,
		alignItems: "center",
	},
	filterButtonPrimaryText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	filterButtonSecondary: {
		flex: 1,
		backgroundColor: "#f3f4f6",
		padding: 16,
		borderRadius: 4,
		alignItems: "center",
	},
	filterButtonSecondaryText: {
		color: "#374151",
		fontSize: 16,
		fontWeight: "600",
	},
});
