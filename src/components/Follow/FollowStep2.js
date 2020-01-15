import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import { GET_USER_TOKEN } from "../../lib/getToken";
import axios from "axios";
import { DEV_SERVER } from "../../setting";

const { width, height } = Dimensions.get("window");

const FollowStep2 = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [account_no, setAccount_no] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (data === null && account_no === null) {
      const getAccountNo = navigation.getParam("account_no");
      setAccount_no(getAccountNo);
    }
  }, []);

  useEffect(() => {
    if (account_no !== null && data === null) {
      callAPI();
    }
  }, [account_no]);

  const callAPI = async () => {
    try {
      const Authorization = await GET_USER_TOKEN();
      const response = await axios.post(
        `${DEV_SERVER}/Profile/getProfile`,
        { account_no },
        {
          headers: {
            Authorization
          }
        }
      );

      console.log(response.data);

      setData(response.data);
    } catch (error) {
      console.log("MainPage.js getOtherUserInfo Function Error", error);
      alert("요청에 문제가 있습니다. 잠시후에 다시 요청해주세요.");
    }
  };

  const onFollow = async () => {
    try {
      const Authorization = await GET_USER_TOKEN();
      const response = await axios.post(
        `${DEV_SERVER}/Follow/follow`,
        { account_no },
        {
          headers: {
            Authorization
          }
        }
      );

      if (response.data.status === "success") {
        callAPI();
      }
    } catch (error) {
      console.log("FollowStep1.js onFollow Function Error", error);
      alert("요청에 문제가 있습니다. 잠시 후에 다시 요청해주세요.");
    }
  };

  const getMyProfile = async () => {
    try {
      const Authorization = await GET_USER_TOKEN();
      const response = await axios.post(
        `${DEV_SERVER}/Profile/getUserProfile`,
        {},
        {
          headers: {
            Authorization
          }
        }
      );

      console.log("response = " + response.data.data.img);
      console.log("response = " + response.data.data.nickname);
      console.log("response = " + response.data.data.email);
      console.log("response = " + response.data.data.board_list);
      setProfile(response.data.data);
    } catch (error) {
      console.log("FollowStep2.js getMyProfile Function Error", error);
      alert("요청에 문제가 있습니다. 잠시후에 다시 요청해주세요.");
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {profile !== undefined && data !== null && (
        <View style={styles.container}>
          <View
            style={{
              display: "flex",
              paddingVertical: 10
            }}
          >
            {/* 친구 프로필 사진, 이름, 팔로잉 버튼 */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                marginBottom: 12,
                paddingHorizontal: 15
              }}
            >
              {/* 프로필 사진 */}
              <Image
                style={{
                  width: 80,
                  height: 80,
                  alignSelf: "center",
                  borderRadius: 40,
                  marginRight: 8.7
                }}
                source={{ uri: data.img }}
              />
              {/* 이름, 이메일 주소, 팔로잉 버튼 */}
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignSelf: "center",
                    paddingHorizontal: 10
                  }}
                >
                  <View style={{ flex: 1 }}>
                    {/* 이름 */}
                    <Text
                      style={{
                        color: "#282828",
                        fontSize: 12,
                        lineHeight: 15,
                        fontWeight: "700"
                      }}
                    >
                      {data.nickname}
                    </Text>
                    {/* 이메일 주소 */}
                    <Text
                      style={{
                        fontSize: 10,
                        lineHeight: 15,
                        color: "#bfbfbf"
                      }}
                    >
                      {data.email}
                    </Text>
                  </View>
                  {/* 팔로잉 버튼 */}
                  {profile.email !== data.email ? (
                    <TouchableOpacity onPress={() => onFollow(data.following)}>
                      {data.following === "CANCELED" ? (
                        <Image
                          resizeMode="contain"
                          style={{ width: 76, height: 33 }}
                          source={require("../../assets/images/bt_following_n.png")}
                        />
                      ) : (
                        <Image
                          resizeMode="contain"
                          style={{ width: 76, height: 33 }}
                          source={require("../../assets/images/bt_following_t.png")}
                        />
                      )}
                    </TouchableOpacity>
                  ) : (
                    <View />
                  )}
                </View>
              </View>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1 }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap"
              }}
            >
              {data.board_list.map(img => (
                <Image
                  // resizeMode="contain"
                  style={{
                    width: width / 3.1,
                    height: width / 3.1,
                    margin: width / 200
                  }}
                  source={{ uri: img.img }}
                  key={img.board_no}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

FollowStep2.navigationOptions = props => {
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
        <Text style={{ fontSize: 15.3, color: "#2b2b2b" }}>프로필 정보</Text>
      </View>
    ),
    headerStyle: {
      borderBottomWidth: 1,
      borderBottomColor: "#e2e2e2",
      elevation: 0
    },
    headerLeft: (
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "flex-start" }}
        onPress={() => navigation.goBack(null)}
      >
        <Image
          resizeMode="contain"
          style={{ width: 24, height: 24, marginLeft: 10 }}
          source={require("../../assets/images/bt_back.png")}
        />
      </TouchableOpacity>
    ),
    headerRight: <View />
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%"
  }
});

export default FollowStep2;
