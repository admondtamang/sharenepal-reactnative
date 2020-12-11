import React from "react";
import { View, Text } from "react-native";

export default function ItemTitle({ name }) {
  return (
    <View
      style={{
        justifyContent: "space-between",
        margin: 20,
        flexDirection: "row",
      }}
    >
      <Text>{name}</Text>
      <Text>More</Text>
    </View>
  );
}
