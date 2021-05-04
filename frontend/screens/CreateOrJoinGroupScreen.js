import {
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import * as React from "react";
import { NavBar, HorizontalDivider } from "../components";
import * as firebase from "firebase";
import { apiUrl } from "../config";

export default function CreateOrJoinGroupScreen(props) {
  const { navigation } = props;
  const leftPress = () => {
    navigation.goBack();
  };
  const [createField, onChangeCreateField] = React.useState("");
  const [groupCodeField, onChangeGroupCodeField] = React.useState("");

  // TODO: setup success / failure messages
  async function joinGroup() {
    if (groupCodeField.length > 0) {
      const bearerToken = await firebase.auth().currentUser.getIdToken();
      await fetch(apiUrl + `api/group/join/${groupCodeField}/`, {
        method: "PATCH",
        headers: new Headers({
          Authorization: "Bearer " + bearerToken,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          navigation.navigate("GroupInfoScreen", {
            name: json.name,
            group_id: json.id,
          });
        })
        .catch(() => {
          Alert.alert(
            "Issue joining group",
            "Sorry, you're already in this group",
            [{ text: "Close" }]
          );
        });
    }
  }

  async function createGroup() {
    if (createField.length > 0) {
      const bearerToken = await firebase.auth().currentUser.getIdToken();
      await fetch(apiUrl + "api/group/", {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + bearerToken,
        }),
        body: JSON.stringify({
          name: createField,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          navigation.navigate("GroupInfoScreen", {
            name: json.name,
            group_id: json.id,
          });
        });
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
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
            onPress={() => createGroup()}
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
            onPress={() => joinGroup()}
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
      </ScrollView>
    </SafeAreaView>
  );
}
