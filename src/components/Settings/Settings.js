import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import axios from "axios";
import { DEV_SERVER } from "../../setting";
import GlobalContext from "../../context/global.context";

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const Settings = ({ navigation }) => {
  const { globalData, setGlobalData } = useContext(GlobalContext);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    
    wait(1000).then(() => setRefreshing(false));
  }, [refreshing]);

  const logout = async () => {
    const response = await axios.post(`${DEV_SERVER}/Account/signIn`, {});
    const responseData = response.data;
    console.log("response = ", response);
    try {
      if (responseData.message === "NoData") {
        AsyncStorage.removeItem("@USER_TOKEN", responseData.Authorization);
        setGlobalData({ ...globalData, isLogged: false });
        navigation.navigate("Login");
        onRefresh();
      }
    } catch (error) {
      console.log("error =>", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* 푸시알림 설정 */}
          <View
            style={{
              height: 70,
              display: "flex",
              flexDirection: "row",
              paddingHorizontal: 20,
              borderBottomColor: "#e2e2e2",
              borderBottomWidth: 0.5,
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Text
              style={{
                color: "#282828",
                fontSize: 14,
                lineHeight: 16,
                fontWeight: "500"
              }}
            >
              푸시알림 설정
            </Text>
            <Switch style={{ width: 40, height: 25, marginRight: 15 }} />
          </View>

          {/* 로그아웃 */}
          <TouchableOpacity
            style={{
              height: 70,
              display: "flex",
              flexDirection: "row",
              paddingHorizontal: 20,
              borderBottomColor: "#e2e2e2",
              borderBottomWidth: 0.5,
              alignItems: "center",
              justifyContent: "space-between"
            }}
            onPress={() => logout()}
          >
            <Text
              style={{
                color: "#282828",
                fontSize: 14,
                lineHeight: 16,
                fontWeight: "500"
              }}
            >
              로그아웃
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

Settings.navigationOptions = props => {
  const { navigation } = props;
  return {
    headerTitle: (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{ fontSize: 15.3, color: "#2b2b2b" }}>설정</Text>
      </View>
    ),
    headerStyle: {
      borderBottomWidth: 1,
      borderBottomColor:"#e2e2e2",
      elevation: 0
    },
    headerLeft: (
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "flex-start" }}
        onPress={() => navigation.goBack(null)}
      >
        <Image
          resizeMode="contain"
          style={{width:24, height:24, marginLeft:10}}
          source={require("../../assets/images/bt_back.png")}
        />
      </TouchableOpacity>
    ),
    headerRight:<View/>
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%"
  }
});

export default Settings;
