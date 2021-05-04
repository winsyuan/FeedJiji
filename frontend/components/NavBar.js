import {
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Touchable,
} from "react-native";
import * as React from "react";

export default function NavBar(props) {
  const { onPressLeft, onPressRight, left, center, right } = props;
  return (
    <View
      style={{
        marginTop: Dimensions.get("window").height * 0.05,
        marginBottom: Dimensions.get("window").height * 0.05,
        marginHorizontal: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {typeof left === "number" ? (
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
          onPress={() => onPressLeft()}
        >
          <Image
            source={left}
            style={{ height: 42, width: 42, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      ) : (
        <View style={{ flex: 1 }}></View>
      )}

      {center && (
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 30,
          }}
        >
          {center}
        </Text>
      )}

      {typeof right === "number" ? (
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          onPress={() => onPressRight()}
        >
          <Image
            source={right}
            style={{ height: 42, width: 42, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      ) : (
        <View style={{ flex: 1 }}></View>
      )}
    </View>
  );
}
