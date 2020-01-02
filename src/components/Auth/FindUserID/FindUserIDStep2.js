import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity
} from "react-native";

const FindUserIDStep2 = ({ navigation }) => {
  // 상결
  //   const [data, setData] = useState(null);

  //   useEffect(() => {
  //     if (data === null) {
  //       const getEmail = navigation.getParam("email");
  // 	  setData(getEmail);
  // 	  console.log("Step2" + getEmail)
  //     }
  //   }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {data !== null && (
        <View
          style={{
            flex: 1,
            height: "100%"
          }}
        >
          {/* 상단 컨테이너 */}
          <View style={{ flex: 1 }}>
            <View style={{ flex: 0.5 }} />
            <View
              style={{
                flex: 1,
                justifyContent: "space-around",
                alignItems: "center",
                alignSelf: "center",
                width: "100%"
              }}
            >
              {/* 환영의 말 */}
              <Text
                style={{
                  color: "#737373",
                  fontSize: 16,
                  fontWeight: "100",
                  textAlign: "center",
                  fontWeight: "600",
                  lineHeight: 30,
                  width: "50%"
                }}
              >
                해당 핸드폰 번호로 가입된{"\n"}아이디 정보는 아래와 같습니다.
              </Text>
              {/* 회원가입 바로가기 버튼 */}
              <View
                style={{
                  width: "80%",
                  height: 50,
                  borderRadius: 10,
                  backgroundColor: "#f5f5f5",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    color: "#949494"
                  }}
                >
                  {/* {data.getEmail} */}
                </Text>
              </View>
            </View>
          </View>
          {/* 하단 컨테이너 */}
          <View
            style={{
              flex: 1,
              paddingHorizontal: 25,
              alignItems: "center",
              justifyContent: "flex-end"
            }}
          >
            {/* 확인 버튼 */}
            <TouchableOpacity
              style={{
                width: "80%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                backgroundColor: "#be1d2d"
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "700"
                }}
              >
                확인
              </Text>
            </TouchableOpacity>
            <View style={{ height: 66 }} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FindUserIDStep2;
