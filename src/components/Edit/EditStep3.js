import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Alert
} from "react-native";
import WriteContext from "../../context/write.context";
import axios from "axios";
import { DEV_SERVER } from "../../setting";
import { GET_USER_TOKEN } from "../../lib/getToken";

const { width, height } = Dimensions.get("window");
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const EditStep3 = ({navigation}) => {
  const [hashTag, setHashTag] = useState(null);
  const [hashTagList, setHashTagList] = useState([]);
  const { writeData, setWriteData } = useContext(WriteContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);


  const validationTagCheck = () => {
    const regex = new RegExp("#");
    const check = regex.test(hashTag);

    if (check) {
      return true;
    } else {
      return false;
    }
  };

  const onCreateHashTag = () => {
    if (hashTag === "") {
      alert("추가하실 태그를 입력해주세요.");
    }

    if (validationTagCheck()) {
      let tag = hashTag
        .replace(" ", "")
        .split(",")
        .filter(tag => tag !== "");
      let tagList = hashTagList.concat(tag);

      let filtering = tagList.filter((item, idx, array) => {
        return array.indexOf(item) === idx;
      });

      setWriteData({
        ...writeData,
        data: {
          ...writeData.data,
          hashTag: filtering.join(",")
        }
      });
      console.log(writeData)

      setHashTagList(filtering);
      setHashTag("");
    } else {
      alert("#태그를 사용해주세요.");
    }
  };

  const writeBoard = async () => {
    try {
      console.log(writeData)
      const Authorization = await GET_USER_TOKEN();
      const response = await axios.post(
        `${DEV_SERVER}/TimeLine/writePost`,
        { ...writeData.data },
        {
          headers: {
            Authorization
          }
        }
        );
        
      if (response.data.status === "SUCCESS") {
        Alert.alert(
          '알림','게시글이 업로드 되었습니다.',[{
            text:'확인', onPress:()=>onRefresh()
          }]
        )
        setWriteData({
          ...writeData,
          data: {
            content: "",
            img_list: "",
            hashTag: ""
          }
        });
        navigation.navigate("NewsPeed")
        onRefresh();
      }
    } catch (error) {
      console.log("App.js API Call Error", error);
      alert("서버에서 에러가 발생했습니다.");
    }
  };

  const removeHashTag = hashTag => {
    const remove = hashTagList.filter(name => name !== hashTag);
    setHashTagList(remove);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, height: "100%" }}>
        <View
          style={{
            flex: 1,
            display: "flex"
          }}
        >
          {/* 태그 표시 컨테이너 */}
          <View
            style={{
              height: 200,
              flexDirection: "row",
              paddingVertical: 20,
              paddingHorizontal: 15,
              flexWrap: "wrap"
            }}
          >
            {/* 추가된 태그 */}
            {hashTagList.map(data => (
              <View
                style={{
                  display: "flex",
                  height: 30,
                  flexDirection: "row",
                  backgroundColor: "#f7f7f7",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                  paddingHorizontal: 5,
                  margin: 5
                }}
                key={data}
              >
                <Text style={{ fontSize: 12, color: "#1b1b1b" }}>{data}</Text>
                <TouchableOpacity onPress={() => removeHashTag(data)}>
                  <Image
                    resizeMode="contain"
                    style={{ width: 12, height: 12, marginLeft: 5 }}
                    source={require("../../assets/images/bt_esc_keyword.png")}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* 태그 입력 컨테이너 */}
          <View
            style={{
              width: width,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 15,
              paddingVertical: 15,
              borderTopWidth: 0.5,
              borderTopColor: "#e2e2e2",
              borderBottomWidth: 0.5,
              borderBottomColor: "#e2e2e2"
            }}
          >
            <TextInput
              autoFocus={true}
              multiline={true}
              style={{
                flex: 1,
                height: 100,
                fontSize: 12.7,
                color: "#282828"
              }}
              placeholder="#태그를 입력해주세요. (최대 10개)"
              value={hashTag}
              onChangeText={text => setHashTag(text)}
            />

            {/* 추가 버튼 */}
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
              onPress={() => onCreateHashTag()}
            >
              <Text style={{ fontSize: 10.7, color: "#737373" }}>추가</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}></View>

          {/* 게시 버튼 */}
          <View style={{ height: 80, justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={{
                width: "70%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                borderRadius: 10,
                backgroundColor: "#be1d2d",
                marginVertical: 15
              }}
              onPress={() => writeBoard()}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                게시
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

EditStep3.navigationOptions = props => {
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
        <Text style={{ fontSize: 15.3, color: "#2b2b2b" }}>게시글 등록</Text>
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

export default EditStep3;
