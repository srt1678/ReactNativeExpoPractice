import "react-native-gesture-handler";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Map from "./screens/Map";
import Cameras from "./screens/Camera"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { Store } from "./redux/store";

const Stack = createStackNavigator();

function App() {
	return (
		<Provider store={Store}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Login"
					screenOptions={{
						headerTitleAlign: "center",
						headerStyle: {
							backgroundColor: "#0080ff",
						},
						headerTintColor: "#ffffff",
						headerTitleStyle: {
							fontSize: 25,
							fontWeight: "bold",
						},
					}}
				>
					<Stack.Screen
						name="Login"
						component={Login}
						options={{
							headerShown: false,
						}}
					></Stack.Screen>
					<Stack.Screen name="Home" component={Home}></Stack.Screen>
					<Stack.Screen name="Map" component={Map}></Stack.Screen>
					<Stack.Screen name="Cameras" component={Cameras}></Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 40,
		fontWeight: "bold",
		margin: 10,
	},
});

export default App;
