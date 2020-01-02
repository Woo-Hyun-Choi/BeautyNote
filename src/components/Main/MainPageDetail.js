import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView
} from "react-native";
import Swiper from "../Swiper/Swiper";
import { GET_USER_TOKEN } from "../../lib/getToken";
import axios from "axios";
import { DEV_SERVER } from "../../setting";
import GlobalContext from "../../context/global.context";

const MainPageDetail = ({ navigation }) => {
  const [detail, setDetail] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState("");
  const [board_no, setBoard_no] = useState(null);
  const { globalData, setGlobalData } = useContext(GlobalContext);

  useEffect(() => {
    if (board_no === null) {
      const getBoard_no = navigation.getParam("board_no");
      setBoard_no(getBoard_no);
      console.log("globalData", globalData);
    }
  }, []);

  useEffect(() => {
    if (detail === null && board_no !== null) {
      getDetailList();
    }
  }, [board_no]);

  useEffect(() => {
    if (detail !== null && commentList.length === 0) {
      getCommentList();
    }
  }, [detail]);

  const getDetailList = async () => {
    try {
      const Authorization = await GET_USER_TOKEN();
      const response = await axios.post(
        `${DEV_SERVER}/TimeLine/getDetail`,
        { board_no },
        {
          headers: {
            Authorization
          }
        }
      );
      console.log("response.data", response.data);

      setDetail(response.data.data);
    } catch (error) {
      console.log("MainpageDetail.js getDetailList Function Error", error);
      alert("요청에 문제가 있습니다. 잠시후에 다시 요청해주세요.");
    }
  };

  const getCommentList = async () => {
    try {
      const Authorization = await GET_USER_TOKEN();
      const response = await axios.post(
        `${DEV_SERVER}/TimeLine/getComment`,
        { board_no },
        {
          headers: {
            Authorization
          }
        }
      );

      console.log("response.data.data", response.data.data);

      setCommentList(response.data.data);
    } catch (error) {
      console.log("MainpageDetail.js getCommentList Function Error", error);
      alert("요청에 문제가 있습니다. 잠시후에 다시 요청해주세요.");
    }
  };

  const writeComment = async () => {
    try {
      if (comment !== "") {
        const Authorization = await GET_USER_TOKEN();
        const response = await axios.post(
          `${DEV_SERVER}/TimeLine/writeComment`,
          {
            content: comment,
            board_no
          },
          {
            headers: {
              Authorization
            }
          }
        );

        alert(response.data.message);
        if (response.data.message === "success") {
          getCommentList();
          setComment("");
          getDetailList();
        } else {
          alert("요청에 문제가 있습니다. 잠시후에 다시 요청해주세요.");
        }
      } else {
        alert("댓글으 입력해주세요.");
      }
    } catch (error) {
      console.log("MainpageDetail.js writeComment Function Error", error);
      alert("요청에 문제가 있습니다. 잠시후에 다시 요청해주세요.");
    }
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
        console.log("board_no", detail);

        const edit = detail.map(data =>
          data.board_no === board_no
            ? {
                ...data,
                is_like: response.data.message
              }
            : data
        );

        setDetail(edit);
      }
    } catch (error) {
      console.log("MainPage.js onLike Function Error", error);
      alert("요청에 문제가 있습니다. 잠시 후에 다시 요청해주세요.");
    }
  };

  const getOtherUserInfo = async account_no => {
    navigation.push("OtherUserPage", {
      account_no
    });
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
        setDetail({
          ...detail,
          follow: detail.follow === "CANCELED" ? "FOLLOWED" : "CANCELED"
        });
      }
    } catch (error) {
      console.log("FollowStep1.js onFollow Function Error", error);
      alert("요청에 문제가 있습니다. 잠시 후에 다시 요청해주세요.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* 뉴스피드(게시물) */}
      {detail !== null && (
        <View style={styles.bottom_container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* 게시물 */}
            <View
              style={{
                display: "flex",
                backgroundColor: "#fff",
                marginTop: 5
              }}
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
                {/* Profile Image */}
                <TouchableOpacity
                  onPress={() => getOtherUserInfo(detail.following_no)}
                >
                  <Image
                    style={{
                      width: 46.7,
                      height: 46.7,
                      borderRadius: 40,
                      marginRight: 8.7
                    }}
                    source={{ uri: detail.writer.img }}
                  />
                </TouchableOpacity>
                {/* 이름, 팔로잉버튼 */}
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
                      {detail.writer.nickname}
                    </Text>
                    {/* 팔로잉 버튼 */}
                    {detail.follow === "CANCELED" ? (
                      <TouchableOpacity
                        onPress={() => onFollow(detail.following_no)}
                      >
                        <Image
                          resizeMode="contain"
                          style={{ width: 76, height: 33 }}
                          source={require("../../assets/images/bt_following_n.png")}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => onFollow(detail.following_no)}
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
                style={{
                  width: "100%",
                  height: 360,
                  backgroundColor: "#000"
                }}
              >
                <Swiper images={detail.img_list} />
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
                  {detail.is_like === "LIKED" ? (
                    <TouchableOpacity onPress={() => onLike(detail.board_no)}>
                      <Image
                        resizeMode="contain"
                        style={{ width: 20, height: 20, marginHorizontal: 10 }}
                        source={require("../../assets/images/bt_love_t.png")}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => onLike(detail.board_no)}>
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
                    {detail.like_num}명
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
                    {detail.comment_num}개
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
                  paddingHorizontal: 15,
                  marginVertical: 20
                }}
              >
                <Text
                  style={{
                    fontSize: 12.7,
                    color: "#282828",
                    lineHeight: 20
                  }}
                >
                  {detail.content}
                </Text>
              </View>
              {/* 태그 */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  paddingHorizontal: 15,
                  justifyContent: "flex-start"
                }}
              >
                {detail.hashTag.split(",").map(tag => (
                  <View
                    style={{
                      display: "flex",
                      height: 30,
                      backgroundColor: "#f7f7f7",
                      marginHorizontal: 4,
                      alignSelf: "center",
                      justifyContent: "center",
                      paddingHorizontal: 6
                    }}
                    key={tag}
                  >
                    <Text
                      style={{
                        color: "#1b1b1b",
                        textAlign: "center",
                        fontSize: 10
                      }}
                    >
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
              {/* 댓글 컨테이너 */}
              <View style={{ marginVertical: 25, paddingHorizontal: 15 }}>
                {/* 댓글 갯수(ex. 댓글 20개) */}
                <View style={{ height: 20 }}>
                  <Text style={{ fontSize: 10, color: "#9a9a9a" }}>
                    댓글 {detail.comment_num}개
                  </Text>
                </View>
                {/* 댓글 내역 */}
                {commentList.length > 0 &&
                  commentList.map(data => (
                    <View
                      style={{
                        minHeight: 70,
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: 12
                      }}
                      key={data.comment_no}
                    >
                      {/* 댓글 작성자 Profile Image */}
                      <Image
                        style={{
                          width: 46.7,
                          height: 46.7,
                          borderRadius: 40,
                          marginRight: 8.7,
                          alignSelf: "center"
                        }}
                        source={{ uri: data.writer.img }}
                      />
                      {/* 댓글 작성자 이름, 댓글 내용, 댓글 작성시간 */}
                      <View style={{ flex: 1, width: "100%" }}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center"
                          }}
                        >
                          {/* 댓글 작성자, 댓글 내용 */}
                          <View
                            style={{
                              flexDirection: "row"
                            }}
                          >
                            {/* 작성자 */}
                            <Text
                              style={{
                                maxWidth: 60,
                                fontSize: 12,
                                color: "#282828",
                                marginHorizontal: 5,
                                alignSelf: "center"
                              }}
                            >
                              {data.writer.nickname}
                            </Text>
                            {/* 댓글 내용 */}
                            <Text
                              style={{
                                flex: 1,
                                fontSize: 12,
                                color: "#282828",
                                lineHeight: 18
                              }}
                            >
                              {data.content}
                            </Text>
                          </View>
                          {/* 댓글 작성시간 */}
                          <View style={{ height: 20, paddingHorizontal: 5 }}>
                            <Text
                              style={{
                                fontSize: 10,
                                lineHeight: 20,
                                color: "#bfbfbf"
                              }}
                            >
                              {data.registertime}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          </ScrollView>

          <KeyboardAvoidingView behavior="padding">
            {/* 댓글 작성, 게시 버튼 */}
            <View
              style={{
                height: 70,
                flexDirection: "row",
                marginBottom: 12,
                paddingHorizontal: 15,
                borderTopColor: "#e2e2e2",
                borderTopWidth: 0.5
              }}
            >
              {/* 댓글 프로필 사진 */}
              <Image
                style={{
                  width: 46.7,
                  height: 46.7,
                  borderRadius: 40,
                  marginRight: 8.7,
                  alignSelf: "center"
                }}
                source={{ uri: globalData.userInfo.img }}
              />
              {/* 댓글 작성란, 게시 버튼 */}
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
                  {/* 댓글 입력창 */}
                  <TextInput
                    style={{
                      flex: 1,
                      paddingHorizontal: 10,
                      color: "#282828",
                      fontSize: 12,
                      fontWeight: "700"
                    }}
                    placeholder="댓글 달기"
                    keyboardType="default"
                    keyboardAppearance="dark"
                    onChangeText={text => setComment(text)}
                    value={comment}
                  />
                  {/* 게시 버튼 */}
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
                    onPress={() => writeComment()}
                  >
                    <Text style={{ fontSize: 10.7, color: "#737373" }}>
                      게시
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      )}
    </SafeAreaView>
  );
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
    height: "100%"
  }
});

export default MainPageDetail;
