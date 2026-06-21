import { StyleSheet } from "react-native";

export const postStyles = StyleSheet.create({
	// Container
	container: {
		backgroundColor: "white",
		borderRadius: 4,
		padding: 16,
		marginBottom: 8,
		borderWidth: 1,
		borderColor: "#e5e7eb",
		shadowColor: "#00000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},

	// Tittel
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#1c411fff",
		marginBottom: 12,
	},

	// Innhold
	contentRow: {
		flexDirection: "row",
		gap: 12,
		marginBottom: 12,
	},
	image: {
		width: 90,
		height: 90,
		borderRadius: 4,
	},
	description: {
		fontSize: 14,
		color: "#6b7280",
		flex: 1,
	},

	// Likes, favoritter og kommentarer
	interactionContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 20,
		paddingTop: 12,
		borderTopWidth: 1,
		borderTopColor: "#f0f0f0",
	},
	interactionItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	interactionText: {
		fontSize: 14,
		color: "#1c411fff",
		fontWeight: "500",
	},
	interactionCount: {
		fontSize: 14,
		color: "#666",
		fontWeight: "500",
	},
});
