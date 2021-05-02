import {
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { HorizontalDivider, NavBar, TimeStamp } from "../components";

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
        {/* TEMP MOCK DATA NEED TO CALL API FOR THIS USE A FLAT LIST */}
        {/* send in group_id to the GroupInfoScreen and call backend api */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("GroupInfoScreen", {
              name: "jiji",
              group_id: "idfrombackend",
            })
          }
        >
          <TimeStamp name="jiji" timeStamp="april 11, 8:34 am" />
        </TouchableOpacity>
        <TouchableOpacity>
          <TimeStamp name="nico" timeStamp="april 10, 7:12 pm" />
        </TouchableOpacity>
        <TouchableOpacity>
          <TimeStamp name="nee" timeStamp="march 20, 7:20 am" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
