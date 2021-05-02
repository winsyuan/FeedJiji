import { View, Dimensions, Text } from "react-native";
import * as React from "react";
export default function TimeStamp(props) {
  const { name, timeStamp } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: Dimensions.get("window").width * 0.1,
        marginTop: Dimensions.get("window").height * 0.03,
      }}
    >
      <Text style={{ color: "white", fontSize: 23 }}>{name}</Text>
      <Text style={{ color: "white", fontSize: 23 }}>{timeStamp}</Text>
    </View>
  );
}
