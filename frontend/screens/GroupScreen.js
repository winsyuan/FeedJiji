import {
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import * as React from "react";
import { HorizontalDivider, NavBar, TimeStamp } from "../components";
import * as firebase from "firebase";
import { AntDesign } from "@expo/vector-icons";
import { apiUrl } from "../config";

export default function GroupScreen(props) {
  const { navigation } = props;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [name, onChangeName] = React.useState("");
  const [bearerToken, setBearerToken] = React.useState("");
  const [data, dataSet] = React.useState(null);
  const [groupData, setGroupData] = React.useState([]);

  const rightPress = () => {
    navigation.navigate("CreateOrJoinGroupScreen");
  };
  const leftPress = () => {
    setModalVisible(true);
  };

  const changeName = async () => {
    if (name.length > 0) {
      setModalVisible(false);
      const bearerToken = await firebase.auth().currentUser.getIdToken();
      await fetch(apiUrl + "api/user/", {
        method: "PATCH",
        headers: new Headers({
          Authorization: "Bearer " + bearerToken,
        }),
        body: JSON.stringify({
          name: name,
        }),
      });

      await getUserGroups();
    }
  };
  async function getUserGroups() {
    const bearerToken = await firebase.auth().currentUser.getIdToken();
    await fetch(apiUrl + "api/user/", {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + bearerToken,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        dataSet(json);
        const groups = [];
        json.groups.map((group) => {
          groups.push(
            <TouchableOpacity
              onPress={async () => {
                navigation.navigate("GroupInfoScreen", {
                  name: group.name,
                  group_id: group.id,
                });
              }}
            >
              {/*  TODO: format the time */}
              <TimeStamp
                name={group.name}
                timeStamp={
                  group.fed_times.length > 0
                    ? group.fed_times[0].time_fed.substring(0, 10)
                    : "not fed yet"
                }
              />
            </TouchableOpacity>
          );
        });
        setGroupData(groups);
      });
  }
  React.useEffect(() => {
    getUserGroups();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22,
        }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                padding: 20,
                width: 335,
                height: 250,
              }}
            >
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <AntDesign name="left" size={24} color="black" />
              </TouchableOpacity>

              <View style={{ alignItems: "center", marginTop: 20 }}>
                {data && data.name ? (
                  <Text style={{ fontSize: 19 }}>
                    Change name from {data.name}
                  </Text>
                ) : (
                  <Text style={{ fontSize: 21 }}>Set name</Text>
                )}
                <TextInput
                  style={{
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    borderRadius: 10,
                    width: 200,
                    textAlign: "center",
                  }}
                  onChangeText={onChangeName}
                  value={name}
                />
                <TouchableOpacity
                  style={{
                    borderRadius: 18,
                    padding: 10,
                    backgroundColor: "black",
                    marginTop: 10,
                    width: 150,
                  }}
                  onPress={() => changeName()}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Change name
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View
        style={{ height: "100%", width: "100%", backgroundColor: "#382c52" }}
      >
        <NavBar
          center="groups"
          right={require("../assets/plus-icon.png")}
          onPressRight={rightPress}
          left={require("../assets/settings-icon.png")}
          onPressLeft={leftPress}
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
        {groupData.length > 0 && groupData}
      </View>
    </SafeAreaView>
  );
}
