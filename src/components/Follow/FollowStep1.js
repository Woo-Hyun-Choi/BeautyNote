import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import { GET_USER_TOKEN } from "../../lib/getToken";
import axios from "axios";
import { DEV_SERVER } from "../../setting";

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const FollowStep1 = ({ navigation }) => {
  const [followList, setFollowList] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(1000).then(() => setRefreshing(false));
    getFollowingList();
  }, [refreshing]);

  useEffect(() => {
    getFollowingList();
  }, []);

  const getFollowingList = async () => {
    try {
      const Authorization = await GET_USER_TOKEN();
      //연동되면 account_no 데이터를 context에서 가져오기

      const response = await axios.post(
        `${DEV_SERVER}/Follow/myFollowingList`,
        {},
        {
          headers: {
            Authorization
          }
        }
      );
      console.log("response.data.data", response.data.data);

      setFollowList(response.data.data);
    } catch (error) {
      console.log("FollowStep1.js getFollowingList Function Error", error);
      alert("요청에 문제가 있습니다. 잠시후에 다시 요청해주세요.");
    }
  };

  const onFollow = async follow_no => {
    try {
      const Authorization = await GET_USER_TOKEN();
      const response = await axios.post(
        `${DEV_SERVER}/Follow/follow`,
        { account_no: follow_no },
        {
          headers: {
            Authorization
          }
        }
      );

      console.log("re", response.data);

      getFollowingList();
    } catch (error) {
      console.log("FollowStep1.js onFollow Function Error", error);
      alert("요청에 문제가 있습니다. 잠시 후에 다시 요청해주세요.");
    }
  };

  const getOtherUserInfo = account_no => {
    navigation.push("OtherUserPage", {
      account_no
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* 친구 목록 리스트 */}
          {followList.map(data => (
            <View
              style={{
                display: "flex",
                borderBottomWidth: 0.5,
                borderBottomColor: "#e2e2e2"
              }}
              key={data.following_no}
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
                <TouchableOpacity
                  onPress={() => getOtherUserInfo(data.following_no)}
                >
                  <Image
                    style={{
                      width: 46.7,
                      height: 46.7,
                      borderRadius: 40,
                      marginRight: 8.7
                    }}
                    source={{ uri: data.img }}
                  />
                </TouchableOpacity>
                {/* 이름, 팔로잉 버튼 */}
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flex: 1,
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignSelf: "center"
                    }}
                    //   key={data.account_no}
                  >
                    {/* 이름 */}
                    <TouchableOpacity
                      onPress={() => getOtherUserInfo(data.following_no)}
                    >
                      <Text
                        style={{
                          color: "#282828",
                          fontSize: 12,
                          fontWeight: "700"
                        }}
                      >
                        {data.nickname}
                      </Text>
                    </TouchableOpacity>
                    {/* 팔로잉 버튼 */}
                    {/* {data.is_follow === "Y" ? ( */}
                    <TouchableOpacity
                      //   onPress={() => onFollow(data.account_no)}
                      onPress={() => onFollow(data.following_no)}
                    >
                      <Image
                        resizeMode="contain"
                        style={{ width: 76, height: 33 }}
                        source={require("../../assets/images/bt_following_t.png")}
                      />
                    </TouchableOpacity>
                    {/* ) : (
                    <TouchableOpacity onPress={() => onFollow(data.account_no)}>
                      <Image
                        resizeMode="contain"
                        style={{ width: 76, height: 33 }}
                        source={require("../../assets/images/bt_following_n.png")}
                      />
                    </TouchableOpacity>
                  )} */}
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

FollowStep1.navigationOptions = props => {
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
        <Text style={{ fontSize: 15.3, color: "#2b2b2b" }}>팔로잉</Text>
      </View>
    ),
    headerStyle: {
      borderBottomWidth: 1,
      borderBottomColor:"#e2e2e2",
      elevation: 0
    }
    // headerLeft: (
    //   <TouchableOpacity
    //     style={{ flex: 1, justifyContent: "flex-start" }}
    //     onPress={() => navigation.goBack(null)}
    //   >
    //     <Image
    //       resizeMode="contain"
    //       style={{width:24, height:24, marginLeft:10}}
    //       source={require("../../assets/images/bt_back.png")}
    //     />
    //   </TouchableOpacity>
    // )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%"
  }
});

export default FollowStep1;
