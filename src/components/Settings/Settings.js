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

const Logout = ({ navigation }) => {
  // const logout = async () => {
  //   const response = await axios.post(`${DEV_SERVER}/Account/signIn`, {});
  //   const responseData = response.data;
  //   console.log("response = ", response.data);
  //   try {
  //     if (response.data.status === "SUCCESS") {
  //       AsyncStorage.removeItem("@USER_TOKEN", responseData.Authorization);
  //       setGlobalData({ ...globalData, isLogged: false });
  //       console.log("if response = ", response);
  //       navigation.navigate("Login");
  //     }
  //   } catch (error) {
  //     console.log("error =>", error);
  //   }
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* 푸시알림 설정 */}
          <View
            style={{
              height: 80,
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
              height: 80,
              display: "flex",
              flexDirection: "row",
              paddingHorizontal: 20,
              borderBottomColor: "#e2e2e2",
              borderBottomWidth: 0.5,
              alignItems: "center",
              justifyContent: "space-between"
            }}
            // onPress={() => logout()}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%"
  }
});

export default Logout;
