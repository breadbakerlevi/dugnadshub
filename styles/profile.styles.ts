import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
	// View
	mainContainer: {
		flex: 1,
		backgroundColor: "#f8f9fa",
	},

	// Topp seksjonen
	topSection: {
		backgroundColor: "white",
		paddingHorizontal: 20,
		paddingTop: 12,
		paddingBottom: 16,
		borderBottomWidth: 2,
		borderBottomColor: "#e5e7eb",
	},
	headerContainer: {
		marginBottom: 16,
		alignItems: "center",
	},
	welcomeText: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#1c411fff",
	},

	// Filter seksjon (vis/status)
	filterSection: {
		marginBottom: 12,
	},
	sectionLabel: {
		fontSize: 12,
		fontWeight: "500",
		color: "#6b7280",
		marginBottom: 6,
		textTransform: "uppercase",
	},

	// Filter knapper (alle/favoritter/mine + status)
	filterButtons: {
		flexDirection: "row",
		gap: 8,
	},
	filterButton: {
		flex: 1,
		paddingVertical: 8,
		borderRadius: 4,
		backgroundColor: "#f3f4f6",
		borderWidth: 1,
		borderColor: "#d1d5db",
		alignItems: "center",
		justifyContent: "center",
	},
	filterButtonLast: {},
	filterButtonActive: {
		backgroundColor: "#1c411fff",
		borderColor: "#1c411fff",
	},
	filterButtonText: {
		fontSize: 13,
		color: "#374151",
		fontWeight: "500",
	},
	filterButtonTextActive: {
		color: "white",
	},

	// Liste
	listContent: {
		flexGrow: 1,
	},
	emptyListContent: {
		flexGrow: 1,
		justifyContent: "center",
	},
	postsListContainer: {
		padding: 16,
	},

	// Logg ut
	logoutButton: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		backgroundColor: "#1c411fff",
		borderRadius: 4,
		marginRight: 8,
	},
	logoutButtonText: {
		color: "white",
		fontSize: 12,
		fontWeight: "600",
	},

	// Tom liste
	noPostsContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	noPostsText: {
		fontSize: 16,
		color: "#6b7280",
		textAlign: "center",
	},
});
