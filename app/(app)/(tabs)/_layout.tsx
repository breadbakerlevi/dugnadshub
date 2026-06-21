import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";

export default function TabBar() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#1c411fff",
				headerStyle: {
					backgroundColor: "#f8f9fa",
				},
				headerTitleStyle: {
					color: "#1c411fff",
					fontWeight: "bold",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Dugnader",
					headerTitle: "DugnadsHub",
					tabBarIcon: ({ color }) => (
						// Ikon hentet fra https://icons.expo.fyi/Index
						<FontAwesome5 name="list" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profil",
					tabBarIcon: ({ color }) => (
						// Ikon hentet fra https://icons.expo.fyi/Index
						<AntDesign name="user" size={24} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
