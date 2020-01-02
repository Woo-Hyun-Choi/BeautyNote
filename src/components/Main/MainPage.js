import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Swiper from "../Swiper/Swiper";
import axios from "axios";
import { DEV_SERVER } from "../../setting";
import { GET_USER_TOKEN } from "../../lib/getToken";
import GlobalContext from "../../context/global.context";

const MainPage = ({ navigation }) => {
  const [lists, setLists] = useState([]);
  const [page_no, setPage_no] = useState(1);
  const { globalData, setGlobalData } = useContext(GlobalContext);

  useEffect(() => {
    if (page_no === 1) {
      callAPI();
    }
  }, []);

  const callAPI = async () => {
    try {
      const Authorization = await GET_USER_TOKEN();
      const response = await axios.post(
        `${DEV_SERVER}/Timeline/getList`,
        { page_no },
        {
          headers: {
            Authorization
          }
        }
      );

      const concat = lists.concat(response.data.data);

      setLists(concat);
      setPage_no(page_no + 1);
    } catch (error) {
      console.log("MainPage.js callAPI Function Error", error);
      alert("요청에 문제가 있습니다. 잠시후에 다시 요청해주세요.");
    }
  };

  const getOtherUserInfo = account_no => {
    navigation.push("OtherUserPage", {
      account_no
    });
  };

  const onLike = async board_no => {
    try {
      const Authorization = await GET_USER_TOKEN();
      const response = await axios.post(
        `${DEV_SERVER}/TimeLine/likePost`,
        { board_no },
        {
          headers: {
            Authorization
          }
        }
      );

      if (response.data.status === "SUCCESS") {
        const edit = lists.map(data =>
          data.board_no === board_no
            ? {
                ...data,
                is_like: response.data.message,
                like_num:
                  response.data.message === "LIKED"
                    ? data.like_num + 1
                    : data.like_num - 1
              }
            : data
        );

        setLists(edit);
      }
    } catch (error) {
      console.log("MainPage.js onLike Function Error", error);
      alert("요청에 문제가 있습니다. 잠시 후에 다시 요청해주세요.");
    }
  };

  const onFollow = async following_no => {
    try {
      const Authorization = await GET_USER_TOKEN();
      const response = await axios.post(
        `${DEV_SERVER}/Follow/follow`,
        { account_no: following_no },
        {
          headers: {
            Authorization
          }
        }
      );

      if (response.data.status === "success") {
        const edit = lists.map(data =>
          data.following_no === following_no
            ? {
                ...data,
                follow: data.follow === "CANCELED" ? "FOLLOWED" : "CANCELED"
              }
            : data
        );

        setLists(edit);
      }
    } catch (error) {
      console.log("FollowStep1.js onFollow Function Error", error);
      alert("요청에 문제가 있습니다. 잠시 후에 다시 요청해주세요.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* 검색창 */}
      <View
        style={{
          width: "95%",
          height: 40,
          flexDirection: "row",
          backgroundColor: "#f5f5f5",
          borderRadius: 10,
          marginVertical: 5,
          alignSelf: "center"
        }}
      >
        <Image
          style={{
            width: 20,
            height: 20,
            justifyContent: "center",
            alignSelf: "center",
            marginHorizontal: 20
          }}
          source={require("../../assets/images/icon_search.png")}
        />
        <TextInput
          style={{ flex: 1 }}
          placeholder="다양한 뷰티이야기를 검색해보세요!"
        />
      </View>
      {/* 태그에 대한 컨테이너 */}
      <View style={styles.tagLine}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.tag_Box}>
            <Text style={styles.tag_Text}>전체</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tag_Box}>
            <Text style={styles.tag_Text}>피부</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tag_Box}>
            <Text style={styles.tag_Text}>메이크업</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tag_Box}>
            <Text style={styles.tag_Text}>산모케어</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tag_Box}>
            <Text style={styles.tag_Text}>네일아트</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* 뉴스피드(게시물) */}
      <View style={styles.bottom_container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* 게시물 */}
          {lists.map(data => (
            <View
              style={{
                display: "flex",
                backgroundColor: "#fff",
                marginTop: 5
              }}
              key={data.board_no}
            >
              {/* 작성자, 팔로잉 버튼 */}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  marginBottom: 12,
                  paddingHorizontal: 15
                }}
              >
                {/* 프로필 이미지 */}
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
                    source={{ uri: data.writer.img }}
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
                  >
                    {/* 이름 */}
                    <Text
                      style={{
                        color: "#282828",
                        fontSize: 12,
                        fontWeight: "700"
                      }}
                    >
                      {data.writer.nickname}
                    </Text>
                    {/* 팔로잉 버튼 */}
                    {data.follow === "CANCELED" ? (
                      <TouchableOpacity
                        onPress={() => onFollow(data.following_no)}
                      >
                        <Image
                          resizeMode="contain"
                          style={{ width: 76, height: 33 }}
                          source={require("../../assets/images/bt_following_n.png")}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => onFollow(data.following_no)}
                      >
                        <Image
                          resizeMode="contain"
                          style={{ width: 76, height: 33 }}
                          source={require("../../assets/images/bt_following_t.png")}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
              {/* 이미지 포스터(Swiper) */}
              <View
                style={{ width: "100%", height: 360, backgroundColor: "#000" }}
              >
                <Swiper images={data.img_list} />
              </View>
              {/* 좋아요, 댓글 수, 공유하기 버튼 */}
              <View
                style={{
                  flex: 1,
                  height: 60,
                  paddingHorizontal: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: "#f5f5f5",
                  borderBottomWidth: 1
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  {/* 좋아요 */}
                  {data.is_like === "LIKED" ? (
                    <TouchableOpacity onPress={() => onLike(data.board_no)}>
                      <Image
                        resizeMode="contain"
                        style={{ width: 20, height: 20, marginHorizontal: 10 }}
                        source={require("../../assets/images/bt_love_t.png")}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => onLike(data.board_no)}>
                      <Image
                        resizeMode="contain"
                        style={{ width: 20, height: 20, marginHorizontal: 10 }}
                        source={require("../../assets/images/bt_love_n.png")}
                      />
                    </TouchableOpacity>
                  )}
                  <Text
                    style={{
                      fontSize: 10.7,
                      color: "#1b1b1b",
                      textAlign: "center"
                    }}
                  >
                    {data.like_num}명
                  </Text>
                  <View style={{ width: 10, height: null }} />
                  {/* 댓글 */}
                  <Image
                    resizeMode="contain"
                    style={{ width: 20, height: 20, marginHorizontal: 10 }}
                    source={require("../../assets/images/bt_chatting.png")}
                  />
                  <Text
                    style={{
                      fontSize: 10.7,
                      color: "#1b1b1b",
                      textAlign: "center"
                    }}
                  >
                    {data.comment_num}개
                  </Text>
                </View>
                {/* 공유하기 버튼 */}
                <View style={{ flex: 1 }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                      marginHorizontal: 10,
                      alignSelf: "flex-end"
                    }}
                    // 추후 수정
                    // source={require("../../assets/images/bt_share.png")}
                  />
                </View>
              </View>
              {/* 게시물 내용 */}
              <View
                style={{
                  height: 60,
                  paddingHorizontal: 15,
                  marginVertical: 20
                }}
              >
                <Text
                  numberOfLines={3}
                  style={{
                    fontSize: 12.7,
                    color: "#282828",
                    lineHeight: 20
                  }}
                >
                  {data.content}
                </Text>
              </View>
              {/* 태그 */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  paddingHorizontal: 15,
                  justifyContent: "flex-start",
                  flexWrap:"wrap"
                }}
              >
                {data.hashTag.split(",").map(tag => (
                  <View
                    style={{
                      display: "flex",
                      height: 30,
                      backgroundColor: "#f7f7f7",
                      marginHorizontal: 4,
                      alignSelf: "center",
                      justifyContent: "center",
                      paddingHorizontal: 6,
                      flexWrap:"wrap"
                    }}
                    key={tag}
                  >
                    <Text
                      style={{
                        color: "#1b1b1b",
                        textAlign: "center",
                        fontSize: 10
                      }}
                    >{console.log(tag)}
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
              
              {/* 게시물 자세히 보기 */}
              <TouchableOpacity
                style={{
                  width: "70%",
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                  borderRadius: 10,
                  backgroundColor: "#be1d2d",
                  marginVertical: 25
                }}
                onPress={() =>
                  navigation.push("NewPeedDetailPage", {
                    board_no: data.board_no
                  })
                }
              >
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}
                >
                  게시물 자세히 보기
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

MainPage.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  tagLine: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    marginVertical: 5
  },
  tag_Box: {
    display: "flex",
    height: 30,
    borderRadius: 18,
    borderColor: "#e2e2e2",
    borderWidth: 0.5,
    backgroundColor: "white",
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15
  },
  tag_Text: {
    color: "#494949",
    fontSize: 12
  },
  bottom_container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#f5f5f5"
  }
});

export default MainPage;
