import {
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { NavBar, HorizontalDivider } from "../components";

export default function CreateOrJoinGroupScreen(props) {
  const { navigation } = props;
  const leftPress = () => {
    navigation.goBack();
  };
  const [createField, onChangeCreateField] = React.useState("");
  const [groupCodeField, onChangeGroupCodeField] = React.useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{ height: "100%", width: "100%", backgroundColor: "#382c52" }}
      >
        <NavBar
          left={require("../assets/left-icon.png")}
          onPressLeft={leftPress}
        />
        <HorizontalDivider
          styles={{ marginTop: -Dimensions.get("window").height * 0.02 }}
        />
        <View>
          <Text
            style={{
              color: "white",
              fontSize: 30,
              marginLeft: Dimensions.get("window").width * 0.07,
              marginTop: Dimensions.get("window").height * 0.01,
            }}
          >
            create
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginTop: 10,
              marginLeft: Dimensions.get("window").width * 0.07,
            }}
          >
            pet name:
          </Text>
          <TextInput
            style={{
              color: "black",
              backgroundColor: "white",
              height: Dimensions.get("window").height * 0.06,
              width: Dimensions.get("window").width * 0.85,
              alignSelf: "center",
              borderRadius: 10,
              marginTop: Dimensions.get("window").height * 0.01,
              paddingLeft: 10,
              fontSize: 18,
            }}
            onChangeText={onChangeCreateField}
            value={createField}
            placeholder="ex. jiji"
          />
          <TouchableOpacity
            style={{
              width: Dimensions.get("window").width * 0.85,
              height: Dimensions.get("window").height * 0.08,
              backgroundColor: "black",
              alignSelf: "center",
              marginTop: Dimensions.get("window").height * 0.03,
              borderRadius: 10,
              marginBottom: Dimensions.get("window").height * 0.03,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 22,
              }}
            >
              create group
            </Text>
          </TouchableOpacity>
        </View>
        <HorizontalDivider />

        <View>
          <Text
            style={{
              color: "white",
              fontSize: 30,
              marginLeft: Dimensions.get("window").width * 0.07,
              marginTop: Dimensions.get("window").height * 0.01,
            }}
          >
            join
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginTop: 10,
              marginLeft: Dimensions.get("window").width * 0.07,
            }}
          >
            group code:
          </Text>
          <TextInput
            style={{
              color: "black",
              backgroundColor: "white",
              height: Dimensions.get("window").height * 0.06,
              width: Dimensions.get("window").width * 0.85,
              alignSelf: "center",
              borderRadius: 10,
              marginTop: Dimensions.get("window").height * 0.01,
              paddingLeft: 10,
              fontSize: 18,
            }}
            onChangeText={onChangeGroupCodeField}
            value={groupCodeField}
            placeholder="ex. BJX32XD"
          />
          <TouchableOpacity
            style={{
              width: Dimensions.get("window").width * 0.85,
              height: Dimensions.get("window").height * 0.08,
              backgroundColor: "black",
              alignSelf: "center",
              marginTop: Dimensions.get("window").height * 0.03,
              borderRadius: 10,
              marginBottom: Dimensions.get("window").height * 0.03,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 22,
              }}
            >
              join group
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
