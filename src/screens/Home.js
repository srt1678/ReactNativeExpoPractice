import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
	Alert,
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import GlobalStyle from "../utils/GlobalStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../utils/CustomButton";
import * as SQLite from "expo-sqlite";
import { useSelector, useDispatch } from "react-redux";
import { setName, setAge, increaseAge, getCities } from "../redux/actions";
import * as Notification from 'expo-notifications';

const db = SQLite.openDatabase("test.db");

Notification.setNotificationHandler({
	handleNotification: async () => {
		return {
			shouldShowAlert: true,
			shouldSetBadge: false,
			shouldPlaySound: false
		}
	}
})


export default function Home({ navigation, route }) {
	const { name, age, cities } = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();
	//const [name, setName] = useState("");
	//const [age, setAge] = useState("");

	useEffect(() => {
		getData();
		dispatch(getCities());
	}, []);

	const getData = () => {
		try {
			db.transaction((tx) => {
				tx.executeSql(
					"SELECT Name, Age FROM Users",
					[],
					(tx, results) => {
						var len = results.rows.length;
						if (len > 0) {
							var userName = results.rows.item(0).Name;
							var userAge = results.rows.item(0).Age;
							dispatch(setName(userName));
							dispatch(setAge(userAge));
						}
					}
				);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const updateData = async () => {
		if (name.length == 0) {
			Alert.alert("Warning!", "Please write your data.");
		} else {
			try {
				db.transaction((tx) => {
					tx.executeSql(
						"UPDATE Users SET Name=?",
						[name],
						() => {
							Alert.alert(
								"Success!",
								"Your data has been updated."
							);
						},
						(error) => {
							console.log(error);
						}
					);
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	const removeData = async () => {
		try {
			db.transaction((tx) => {
				tx.executeSql(
					"DELETE FROM Users",
					[],
					() => {
						navigation.navigate("Login");
					},
					(error) => {
						console.log(error);
					}
				);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleNotification = async (item) => {
		await Notification.scheduleNotificationAsync({
			content: {
				title: "You clicked on " + item.country,
				body: item.city,
			},
			trigger: {
				seconds: 3
			}
		})
	}

	return (
		<View style={styles.body}>
			<Text style={[GlobalStyle.CustomFont, styles.text]}>
				Welcome {name}!
			</Text>
			<CustomButton
				title="Open Camera"
				color="#0080ff"
				onPressFunction={() => {navigation.navigate('Cameras')}}
			>

			</CustomButton>
			<FlatList
				data={cities}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={async() => {
							await handleNotification(item)
							navigation.navigate('Map', {
								city: item.city,
								lat: item.lat,
								lng: item.lng
							})
						}}
					>
						<View style={styles.item}>
							<Text style={styles.title}>{item.country}</Text>
							<Text style={styles.subtitle}>{item.city}</Text>
						</View>
					</TouchableOpacity>
				)}
			></FlatList>
			{/*<Text style={[GlobalStyle.CustomFont, styles.text]}>
				Your age is {age}!
			</Text>
			<TextInput
				style={styles.input}
				placeholder="Enter your name"
				value={name}
				onChangeText={(value) => dispatch(setName(value))}
			></TextInput>
			<CustomButton
				title="Update"
				color="#ff7f00"
				onPressFunction={updateData}
			></CustomButton>
			<CustomButton
				title="Remove"
				color="#f40100"
				onPressFunction={removeData}
			></CustomButton>
			<CustomButton
				title="Increase Age"
				color="#0080ff"
				onPressFunction={() => {dispatch(increaseAge())}}
	></CustomButton>*/}
		</View>
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
		margin: 10,
	},
	input: {
		width: 300,
		borderWidth: 1,
		borderColor: "#555",
		borderRadius: 10,
		backgroundColor: "#ffffff",
		textAlign: "center",
		fontSize: 20,
		marginTop: 130,
		marginBottom: 10,
	},
	item: {
		backgroundColor: "#ffffff",
		boderWidth: 2,
		borderColor: "#cccccc",
		borderRadius: 5,
		margin: 7,
		width: 350,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 30,
		margin: 10,
	},
	subtitle: {
		fontSize: 20,
		margin: 10,
		color: "#999999",
	},
});
