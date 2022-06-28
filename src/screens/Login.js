import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, Alert } from "react-native";
import CustomButton from "../utils/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
import { useSelector, useDispatch } from "react-redux";
import {setName, setAge} from '../redux/actions';


const db = SQLite.openDatabase("test.db");

export default function Login({ navigation }) {
    const { name, age} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
	//const [name, setName] = useState("");
	//const [age, setAge] = useState("");

	useEffect(() => {
		createTable();
		getData();
        //createChannels();
	}, []);

	const createTable = () => {
		db.transaction((tx) => {
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS " +
					"Users " +
					"(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);"
			);
		});
	};

	const getData = () => {
		try {
			db.transaction((tx) => {
				tx.executeSql(
					"SELECT Name, Age FROM Users",
					[],
					(tx, results) => {
						var len = results.rows.length;
						if (len > 0) {
							navigation.navigate("Home");
						}
					}
				);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const setData = () => {
		if (name.length == 0 || age.length == 0) {
			Alert.alert("Warning!", "Please write your data.");
		} else {
			try {
                dispatch(setName(name));
                dispatch(setAge(age));
				db.transaction((tx) => {
					tx.executeSql(
						"INSERT INTO Users (Name, Age) VALUES (?,?)",
						[name, age]
					);
				});
				navigation.navigate("Home");
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<View style={styles.body}>
			<Image
				style={styles.logo}
				source={require("../../assets/redux.png")}
			></Image>
			<Text style={styles.text}>Redux</Text>
			<TextInput
				style={styles.input}
				placeholder="Enter your name"
				placeholderTextColor="#808080"
				onChangeText={(value) => dispatch(setName(value))}
			></TextInput>
			<TextInput
				style={styles.input}
				placeholder="Enter your age"
				placeholderTextColor="#808080"
				onChangeText={(value) => dispatch(setAge(value))}
			></TextInput>
			<CustomButton
				title="Login"
				color="#1eb900"
				onPressFunction={setData}
			></CustomButton>
		</View>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#0080ff",
	},
	logo: {
		width: 150,
		height: 150,
		margin: 20,
	},
	text: {
		fontSize: 30,
		color: "#ffffff",
		marginBottom: 100,
	},
	input: {
		width: 300,
		borderWidth: 1,
		borderColor: "#555",
		borderRadius: 10,
		backgroundColor: "#ffffff",
		textAlign: "center",
		fontSize: 20,
		marginBottom: 10,
	},
});
