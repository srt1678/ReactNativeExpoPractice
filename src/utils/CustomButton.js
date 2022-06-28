import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";

const MashButton = (props) => {
	return (
		<Pressable
			onPress={props.onPressFunction}
			hitSlop={{ top: 10, bottom: 10, right: 50, left: 10 }}
			style={({ pressed }) => [
				styles.button,
				{ backgroundColor: pressed ? "#dddddd" : props.color},
                { ...props.style}
			]}
		>
			<Text style={styles.text}>{props.title}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	text: {
		color: "#000000",
		fontSize: 20,
		margin: 10,
		textAlign: "center",
	},
	button: {
		width: 150,
		height: 50,
		alignItems: "center",
	},
});

export default MashButton;
