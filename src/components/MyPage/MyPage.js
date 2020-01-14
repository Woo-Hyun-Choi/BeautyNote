import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  RefreshControl
} from "react-native";
import { GET_USER_TOKEN } from "../../lib/getToken";
import axios from "axios";
import { DEV_SERVER } from "../../setting";
import ImagePicker from "react-native-image-picker";

const { width, height } = Dimensions.get("window");
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const options = {
  title: "프로필 사진 설정",
  storageOptions: {
    skipBackup: true,
    path: "images"
  },
  cancelButtonTitle: "닫기",
  takePhotoButtonTitle: "사진 촬영하기",
  chooseFromLibraryButtonTitle: "앨범에서 사진 선택",
  tintColor: "#ff"
};

const MyPage = ({ navigation }) => {
  const [lists, setLists] = useState([]);
  const [profile, setProfile] = useState(null);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
    getMyProfile();
  }, [refreshing]);

  useEffect(() => {
    getMyProfile();
  }, []);

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
      console.log("MyPage.js getMyProfile Function Error", error);
      alert("요청에 문제가 있습니다. 잠시후에 다시 요청해주세요.");
    }
  };

  const updateProfile = async img_no => {
    try {
      const Authorization = await GET_USER_TOKEN();
      const response = await axios.post(
        `${DEV_SERVER}/Profile/updateProfile`,
        { img_no },
        {
          headers: {
            Authorization
          }
        }
      );

      if (response.data.status === "SUCCESS") {
        alert("프로필 변경이 완료 되었습니다.");
        getMyProfile();
      }
    } catch (error) {
      console.log("MyPage.js updateProfile Function Error", error);
      alert("요청에 문제가 있습니다.");
    }
  };

  const uploadPhoto = async ({ uri, name, type }) => {
    try {
      uri = Platform.OS === "android" ? uri : uri.replace("file://", "");
      const Authorization = await GET_USER_TOKEN();
      const formData = new FormData();

      formData.append("file", {
        uri,
        name,
        type
      });

      const response = await axios.post(
        `${DEV_SERVER}/File/fileUpload`,
        formData,
        {
          headers: {
            Authorization,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      const concat = lists.concat(response.data.data);

      if (response.data.data) {
        updateProfile(response.data.data.file_no);
        console.log(response.data.data);
      } else {
        alert("파일을 추가 할 수 없습나디.");
      }
    } catch (error) {
      console.log("MyPage.js uploadPhoto Function Error", error);
      alert("요청에 문제가 있습니다.");
    }
  };

  const editProfileImage = () => {
    try {
      ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
        } else {
          uploadPhoto({
            uri: response.uri,
            name: response.fileName,
            type: response.type
          });
        }
      });
    } catch (error) {
      console.log("Error =>", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {profile !== null && (
          <React.Fragment>
            <View
              style={{
                display: "flex",
                paddingVertical: 10
              }}
            >
              {/* 내 프로필 사진, 이름, 편집 버튼 */}
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
                  source={{
                    uri:
                      profile.img !== null
                        ? profile.img
                        : "https://image.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"
                  }}
                  // source={{ uri: profile.img} !== null ? { uri: profile.img} : require("../../assets/images/main_mypage_n.png")}
                />
                {/* 이름, 이메일 주소, 편집 버튼 */}
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
                        {profile.nickname}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          lineHeight: 15,
                          color: "#bfbfbf"
                        }}
                      >
                        {profile.email}
                      </Text>
                    </View>
                    {/* 편집 버튼 */}
                    <TouchableOpacity
                      style={{
                        width: 70,
                        height: 27,
                        borderRadius: 20,
                        borderWidth: 0.7,
                        borderColor: "#737373",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                      onPress={() => editProfileImage()}
                    >
                      <Text style={{ fontSize: 10.7, color: "#737373" }}>
                        편집
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap"
                }}
              >
                {profile.board_list !== undefined ? (
                  profile.board_list.map(data => (
                    <TouchableOpacity
                      // onPress={() =>
                      //   navigation.navigate("MyPageDetail", {
                      //     board_no: profile.board_no
                      //   })
                      // }
                      key={data.board_no}
                    >
                      <Image
                        style={{
                          width: width / 3.1,
                          height: width / 3.1,
                          margin: width / 200
                        }}
                        source={{ uri: data.img }}
                        key={data.board_no}
                      />
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 16 }}>
                      등록된 게시물이 없습니다.
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </React.Fragment>
        )}
      </View>
    </SafeAreaView>
  );
};

MyPage.navigationOptions = props => {
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
        <Text style={{ fontSize: 15.3, color: "#2b2b2b" }}>내정보</Text>
      </View>
    ),
    headerStyle: {
      borderBottomWidth: 1,
      borderBottomColor: "#e2e2e2",
      elevation: 0
    },
    headerLeft: <View />,
    headerRight: (
      <TouchableOpacity
        style={{ flex: 1, alignItems: "flex-end", paddingRight: 10 }}
        onPress={() => navigation.navigate("Settings")}
      >
        <Image
          style={{ height: 20, width: 20, resizeMode: "contain" }}
          source={require("../../assets/images/bt_setting.png")}
        />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%"
  }
});

export default MyPage;
