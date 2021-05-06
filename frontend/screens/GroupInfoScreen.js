import {
  SafeAreaView,
  View,
  Dimensions,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { NavBar, HorizontalDivider, TimeStamp } from "../components/index";
import { apiUrl } from "../config";
import * as firebase from "firebase";
import Moment from "moment";

export default function GroupInfoScreen(props) {
  const { name, group_id } = props.route.params;
  const [groupName] = React.useState(name);
  const [groupCode, setGroupCode] = React.useState("");
  const [fedTimes, setFedTimes] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [initial, setInitial] = React.useState(true);

  const { navigation } = props;

  React.useEffect(() => {
    getGroupInfo();
  }, []);

  async function fedPet() {
    const bearerToken = await firebase.auth().currentUser.getIdToken();
    await fetch(apiUrl + `api/group/${group_id}/`, {
      method: "PATCH",
      headers: new Headers({
        Authorization: "Bearer " + bearerToken,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setGroupCode(json.group_code);
        const data = [];
        json.fed_times.map((fed) => {
          data.push({
            name: fed.name,
            time_fed: Moment(fed.time_fed)
              .format("MMMM D, HH:mm")
              .toLowerCase(),
          });
        });
        setFedTimes(data);
      });
  }
  async function getGroupInfo() {
    const bearerToken = await firebase.auth().currentUser.getIdToken();
    await fetch(apiUrl + `api/group/${group_id}/?page=${page}`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + bearerToken,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setGroupCode(json.group_code);
        let data = [];
        json.fed_times.map((fed) => {
          data.push({
            name: fed.name,
            time_fed: Moment(fed.time_fed)
              .format("MMMM D, HH:mm")
              .toLowerCase(),
          });
        });
        data = fedTimes.concat(data);
        setFedTimes(data);
      });
  }

  const leftPress = () => {
    navigation.goBack();
  };
  const rightPress = () => {
    // modal pop up to show prop code or invite or we can use RN Share.share
    Alert.alert("Share this code for them to join the group!", groupCode, [
      { text: "OK" },
    ]);
  };

  const renderItem = ({ item }) => (
    <TimeStamp name={item.name} timeStamp={item.time_fed} />
  );

  const getMoreTimes = async () => {
    await setPage(page + 1);
    getGroupInfo();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{ height: "100%", width: "100%", backgroundColor: "#382c52" }}
      >
        <NavBar
          left={require("../assets/left-icon.png")}
          onPressLeft={leftPress}
          center={groupName}
          right={require("../assets/plus-icon.png")}
          onPressRight={rightPress}
        />
        <HorizontalDivider
          styles={{ marginTop: -Dimensions.get("window").height * 0.02 }}
        />
        {/* TODO: figure out the lazy loading */}
        <View style={{ flex: 1 }}>
          <FlatList
            data={fedTimes ? fedTimes : []}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.1}
            onEndReached={({ distanceFromEnd }) => {
              if (initial) {
                setInitial(false);
                setPage(1);
                return;
              }
              if (distanceFromEnd < 0) return;
              getMoreTimes();
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            height: Dimensions.get("window").height * 0.08,
            marginBottom: Dimensions.get("window").height * 0.03,
            width: Dimensions.get("window").width * 0.7,
            alignSelf: "center",
            borderRadius: 20,
            justifyContent: "center",
          }}
          onPress={() => fedPet()}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              alignItems: "center",
              fontSize: 20,
            }}
          >
            Fed {groupName}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
