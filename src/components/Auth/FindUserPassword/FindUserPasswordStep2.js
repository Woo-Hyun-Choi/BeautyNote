/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert
} from "react-native";
import axios from "axios";
import { DEV_SERVER } from "../../../setting";

// const dummy = {
//   account_no: 16,
//   pwToken: "35175599701726791156"
// };

const FindUserPasswordStep2 = ({navigation}) => {
  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const getPassword = navigation.getParam("Password");
  
  const Password = {
    account_no: getPassword.account_no,
    pwToken: getPassword.pwToken
  }
  console.log("Step2 getPassword is " + getPassword)

  useEffect(() => {
    if (data === null) {
    setData(getPassword);
    }
  }, []);


  const onChange = (text, type) => {
    setData({
      ...data,
      [type]: text
    });
  };

  const changePassword = async () => {
    try {
      const { password, confirmPassword } = data;
      const { pwToken, account_no } = Password;
      console.log({
        password,
        confirmPassword,
        account_no,
        pwToken
      });

      if (password === confirmPassword) {
        const response = await axios.post(`${DEV_SERVER}/Account/setNewPw`, {
          newPassword: password,
          pwToken,
          account_no
        });

        if (response.data.message === "Inserted") {
          Alert.alert(
            "알림",
            "비밀번호 변경이 완료되었습니다.",
            [{ text: "확인", onPress: () => navigation.navigate("Login") }],
            { cancelable: false }
          );
        } else {
          alert("요청에 문제가 있습니다.");
        }
      } else {
        alert("비밀번호와 비밀번호 확인이 서로 일치 하지 않습니다.");
      }
    } catch (error) {
      console.log("FindUserIDStep2.js changePassword Function Error", error);
      alert("요청에 문제가 있습니다.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          {/* 신규 비밀번호를 생성해주세요. */}
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
            신규 비밀번호를 생성해주세요.
          </Text>

          {/* 비밀번호 입력 컨테이너 */}
          {/* 신규 비밀번호 */}
          <View
            style={{
              height: 50,
              flexDirection: "row",
              marginVertical: 10,
              paddingHorizontal: 25
            }}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ color: "#282828", fontSize: 14 }}>
                신규 비밀번호
              </Text>
            </View>
            <TextInput
              style={{
                flex: 2,
                borderBottomColor: "#282828",
                borderBottomWidth: 0.5
              }}
              placeholder="비밀번호를 입력해주세요!"
              onChangeText={text => onChange(text, "password")}
              secureTextEntry={true}
            />
          </View>

          {/* 신규 비밀번호 */}
          <View
            style={{
              height: 50,
              flexDirection: "row",
              marginVertical: 10,
              paddingHorizontal: 25
            }}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ color: "#282828", fontSize: 14 }}>
                비밀번호 확인
              </Text>
            </View>
            <TextInput
              style={{
                flex: 2,
                borderBottomColor: "#282828",
                borderBottomWidth: 0.5
              }}
              placeholder="비밀번호를 다시 한 번 입력해주세요!"
              onChangeText={text => onChange(text, "confirmPassword")}
              secureTextEntry={true}
            />
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
          onPress={() => changePassword()}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
            확인
          </Text>
        </TouchableOpacity>
        <View style={{ height: 66 }} />
      </View>
    </SafeAreaView>
  );
};

export default FindUserPasswordStep2;
