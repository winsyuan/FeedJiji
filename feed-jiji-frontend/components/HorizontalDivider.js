import { View, Dimensions } from "react-native";
import * as React from "react";
export default function HorizontalDivider(props) {
  const { styles = {} } = props;
  return (
    <View
      style={{
        borderBottomColor: "white",
        borderBottomWidth: 1,
        width: Dimensions.get("window").width * 0.9,
        alignSelf: "center",
        ...styles,
      }}
    />
  );
}
