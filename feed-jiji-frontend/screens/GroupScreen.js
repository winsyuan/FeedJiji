import { Text, View, Dimensions } from "react-native";
import * as React from "react";
import { HorizontalDivider } from "../components";

export default function GroupScreen(props) {
  const { navigation } = props;
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "#382c52" }}>
      {/* use navbar component up here */}
      {/* TEMP: placeholder for navbar */}
      <View style={{ height: Dimensions.get("window").height * 0.1 }}></View>
      <HorizontalDivider />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: Dimensions.get("window").width * 0.1,
          marginTop: Dimensions.get("window").height * 0.03,
        }}
      >
        <Text style={{ color: "white", fontSize: 23 }}>name</Text>
        <Text style={{ color: "white", fontSize: 23 }}>last time fed</Text>
      </View>
      <HorizontalDivider addStyles={{ marginTop: 20 }} />
      {/* TEMP MOCK DATA NEED TO CALL API FOR THIS */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: Dimensions.get("window").width * 0.1,
          marginTop: Dimensions.get("window").height * 0.03,
        }}
      >
        <Text style={{ color: "white", fontSize: 23 }}>jiji</Text>
        <Text style={{ color: "white", fontSize: 23 }}>april 11, 8:34 am</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: Dimensions.get("window").width * 0.1,
          marginTop: Dimensions.get("window").height * 0.03,
        }}
      >
        <Text style={{ color: "white", fontSize: 23 }}>nico</Text>
        <Text style={{ color: "white", fontSize: 23 }}>april 10, 7:12 pm</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: Dimensions.get("window").width * 0.1,
          marginTop: Dimensions.get("window").height * 0.03,
        }}
      >
        <Text style={{ color: "white", fontSize: 23 }}>nee</Text>
        <Text style={{ color: "white", fontSize: 23 }}>march 20, 7:20 am</Text>
      </View>
    </View>
  );
}
