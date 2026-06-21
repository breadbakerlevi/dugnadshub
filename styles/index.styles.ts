import { StyleSheet } from "react-native";

export const indexStyles = StyleSheet.create({
	// View
	mainContainer: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 12,
		backgroundColor: "#f8f9fa",
	},

	// Utility (søk, filter, lag nytt innlegg)
	utilityBar: {
		flexDirection: "row",
		width: "100%",
		gap: 12,
		marginBottom: 16,
		paddingHorizontal: 4,
		alignItems: "center",
	},
	filterButton: {
		padding: 10,
		borderRadius: 8,
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: "#1c411fff",
		justifyContent: "center",
		alignItems: "center",
		width: 44,
		height: 44,
	},
	filterButtonActive: {
		backgroundColor: "#1c411fff",
	},
	searchContainer: {
		flex: 1,
	},
	searchInput: {
		borderWidth: 1,
		padding: 12,
		borderRadius: 8,
		borderColor: "#d1d5db",
		backgroundColor: "white",
		fontSize: 16,
	},
	plusButton: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		backgroundColor: "#1c411fff",
		borderRadius: 8,
		width: 44,
		height: 44,
		justifyContent: "center",
		alignItems: "center",
	},
	plusButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},

	// Liste
	listContent: {
		paddingBottom: 20,
	},
	emptyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 100,
	},
	emptyText: {
		fontSize: 18,
		color: "#6b7280",
		marginBottom: 8,
	},
	emptySubtext: {
		fontSize: 14,
		color: "#9ca3af",
		textAlign: "center",
	},
});
