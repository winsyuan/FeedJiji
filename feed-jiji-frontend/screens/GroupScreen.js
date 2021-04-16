import {
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { HorizontalDivider, NavBar } from "../components";

export default function GroupScreen(props) {
  const { navigation } = props;
  const rightPress = () => {
    navigation.navigate("CreateOrJoinGroupScreen");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{ height: "100%", width: "100%", backgroundColor: "#382c52" }}
      >
        <NavBar
          center="groups"
          right={require("../assets/plus-icon.png")}
          onPressRight={rightPress}
        />
        <HorizontalDivider
          styles={{ marginTop: -Dimensions.get("window").height * 0.02 }}
        />
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
        <HorizontalDivider styles={{ marginTop: 20 }} />
        {/* TEMP MOCK DATA NEED TO CALL API FOR THIS */}
        <TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: Dimensions.get("window").width * 0.1,
              marginTop: Dimensions.get("window").height * 0.03,
            }}
          >
            <Text style={{ color: "white", fontSize: 23 }}>jiji</Text>
            <Text style={{ color: "white", fontSize: 23 }}>
              april 11, 8:34 am
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: Dimensions.get("window").width * 0.1,
              marginTop: Dimensions.get("window").height * 0.03,
            }}
          >
            <Text style={{ color: "white", fontSize: 23 }}>nico</Text>
            <Text style={{ color: "white", fontSize: 23 }}>
              april 10, 7:12 pm
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: Dimensions.get("window").width * 0.1,
              marginTop: Dimensions.get("window").height * 0.03,
            }}
          >
            <Text style={{ color: "white", fontSize: 23 }}>nee</Text>
            <Text style={{ color: "white", fontSize: 23 }}>
              march 20, 7:20 am
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
