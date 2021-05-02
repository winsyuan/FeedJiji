import { SafeAreaView, View, Dimensions, Alert, FlatList } from "react-native";
import * as React from "react";
import { NavBar, HorizontalDivider, TimeStamp } from "../components/index";

export default function GroupInfoScreen(props) {
  // default set but need to call backend with group_id
  const { name } = props.route.params;
  const [groupName, onChangeName] = React.useState(name);
  const { navigation } = props;
  const leftPress = () => {
    navigation.goBack();
  };
  const rightPress = () => {
    // modal pop up to show prop code or invite
    // or we can use RN Share.share
    Alert.alert(
      "Share this code for them to join the group!",
      // hard coded need to grab from backend
      "BJX32XD",
      [{ text: "OK" }]
    );
  };
  const data = [
    { name: "john", time_fed: "april 11, 8:34 am" },
    { name: "bob", time_fed: "april 10, 7:41 pm" },
    { name: "andrew", time_fed: "april 10, 7:54 am" },
    { name: "nikesha", time_fed: "april 9, 8:12 pm" },
    { name: "taylor", time_fed: "april 9, 8:37 am" },
  ];

  const renderItem = ({ item }) => (
    <TimeStamp name={item.name} timeStamp={item.time_fed} />
  );
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
        {/* figure out the lazy loading */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      </View>
    </SafeAreaView>
  );
}
