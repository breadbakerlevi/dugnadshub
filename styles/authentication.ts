import { StyleSheet } from "react-native";

export const authenticationStyle = StyleSheet.create({
	// View
	container: {
		flex: 1,
		backgroundColor: "#f8f9fa",
	},
	mainContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 24,
		width: "100%",
	},

	// Header + title
	header: {
		alignItems: "center",
		marginBottom: 40,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#1c411fff",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: "#6b7280",
		textAlign: "center",
	},

	// Text fields
	textFieldContainer: {
		width: "100%",
		marginBottom: 16,
	},
	label: {
		fontSize: 14,
		fontWeight: "500",
		color: "#374151",
		marginBottom: 4,
	},
	textField: {
		borderWidth: 1,
		padding: 12,
		borderColor: "#d1d5db",
		borderRadius: 4,
		backgroundColor: "white",
		fontSize: 16,
	},

	// Knapper
	buttonContainer: {
		width: "100%",
		gap: 12,
		paddingTop: 24,
	},
	primaryButton: {
		paddingHorizontal: 16,
		paddingVertical: 14,
		borderRadius: 4,
		backgroundColor: "#1c411fff",
		alignItems: "center",
	},
	primaryButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	googleButton: {
		paddingHorizontal: 16,
		paddingVertical: 14,
		borderRadius: 4,
		backgroundColor: "#ffffff",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#d1d5db",
	},
	googleButtonText: {
		color: "#374151",
		fontSize: 16,
		fontWeight: "600",
	},

	// Logg inn knapp
	toggleButton: {
		paddingTop: 24,
		paddingBottom: 8,
	},
	toggleText: {
		color: "#1c411fff",
		textAlign: "center",
	},
});
