/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import { DEV_SERVER } from "../../../setting";

const FindUserPasswordStep1 = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    phone: "",
    code: "",
    sent: false
  });

  const sendVerifyCode = async () => {
    try {
      if (data.email !== "") {
        const { phone } = data;
        console.log(phone);
        const response = await axios.post(`${DEV_SERVER}/Account/sendSMSAuth`, {
          phone,
          type: "PASSWORD"
        });

        console.log("response.data", response.data);

        if (response.data.message === "SENT") {
          alert("인증번호가 전송되었습니다.");
          setData({ ...data, sent: true });
        } else {
          alert("올바른 전화번호를 입력해주세요.");
        }
      } else {
        alert("이메일을 입력해주세요.");
      }
    } catch (error) {
      console.log("FindUserIDStep1.js SendVerifyCode Function Error", error);
      alert("요청에 문제가 있습니다. 잠시후에 다시 요청해주세요.");
    }
  };

  const checkVerifyCode = async () => {
    try {
      if (data.sent) {
        const { phone, code } = data;
        const response = await axios.post(
          `${DEV_SERVER}/Account/verifySMSAuth`,
          {
            phone,
            code,
            type: "PASSWORD"
          }
        );
        console.log("response data =>", response.data);

        if (response.data.message === "invalidPhoneAuth") {
          alert("인증번호가 올바르지 않습니다.");
        } else if (response.data.message === "expiredPhoneAuth") {
          alert("인증번호가 만료되었습니다.");
        } else if (response.data.message === "NoData") {
          alert("인증번호를 다시 요청해주세요.");
        }

        if (response.data.status === "success") {
          callAPI({ phone, code });
        }
      } else {
        alert("인증번호를 요청해주세요.");
      }
    } catch (error) {
      console.log("SignUp.js checkVerifyCode Error", error);
      alert("에러가 발생했습니다. 잠시후에 다시 시도해주세요.");
    }
  };

  const callAPI = async ({ phone, code }) => {
    console.log({ phone, code });
    try {
      const response = await axios.post(`${DEV_SERVER}/Account/findPassword`, {
        phone,
        code,
        type: "PASSWORD"
      });

      console.log("rrrrrrr", response.data);

      if (response.data.message === "invalidPhoneAuth") {
        alert("인증번호가 올바르지 않습니다.");
      } else if (response.data.message === "expiredPhoneAuth") {
        alert("인증번호가 만료되었습니다.");
      } else if (response.data.message === "NoData") {
        alert("인증번호를 다시 요청해주세요.");
      }

      if (response.data.status === "success") {
        alert("인증이 확인되었습니다.");
        console.log("response", response.data.data);
        // setData({
        // 	...data,
        // 	verifySMSAuth: true
        // })
      }
    } catch (error) {
      console.log("FindUserPasswordStep1.js callAPI Function Error", error);
      alert("요청에 문제가 있습니다.");
    }
  };

  const onChange = (text, type) => {
    setData({
      ...data,
      [type]: text
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* 상단 컨테이너 */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: 25
        }}
      >
        {/* 이메일 */}
        <View style={{ height: 50, flexDirection: "row", marginVertical: 10 }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ color: "#282828", fontSize: 14 }}>이메일</Text>
          </View>
          {/* 이메일 기재란 */}
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomColor: "#282828",
              borderBottomWidth: 0.5
            }}
          >
            <TextInput
              style={{ flex: 2, fontSize: 12.7, color: "#282828" }}
              placeholder="이메일을 입력해주세요"
              onChangeText={text => onChange(text, "email")}
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* 휴대폰번호 */}
        <View style={{ height: 50, flexDirection: "row", marginVertical: 10 }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ color: "#282828", fontSize: 14 }}>휴대폰번호</Text>
          </View>
          {/* 휴대폰 번호 기재란 */}
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomColor: "#282828",
              borderBottomWidth: 0.5
            }}
          >
            <TextInput
              style={{ flex: 1, fontSize: 12.7, color: "#282828" }}
              placeholder="- 제외"
              onChangeText={text => onChange(text, "phone")}
            />
            <TouchableOpacity
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => sendVerifyCode()}
            >
              <ImageBackground
                style={{
                  width: 86,
                  height: 33,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                resizeMode="contain"
                source={require("../../../assets/images/bt_sub_gray.png")}
              >
                <Text
                  style={{ fontSize: 10, color: "#fff", textAlign: "center" }}
                >
                  인증번호 요청
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>

        {/* 인증번호 입력 */}
        <View style={{ height: 50, flexDirection: "row", marginVertical: 10 }}>
          <View style={{ flex: 1, justifyContent: "center" }} />
          {/* 인증번호 기재란 */}
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomColor: "#282828",
              borderBottomWidth: 0.5
            }}
          >
            <TextInput
              style={{ flex: 1, fontSize: 12.7, color: "#282828" }}
              placeholder="인증번호 입력"
              onChangeText={text => onChange(text, "code")}
            />
            <TouchableOpacity
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => checkVerifyCode()}
            >
              <ImageBackground
                style={{
                  width: 86,
                  height: 33,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                resizeMode="contain"
                source={require("../../../assets/images/bt_sub_rad.png")}
              >
                <Text
                  style={{ fontSize: 10, color: "#fff", textAlign: "center" }}
                >
                  인증번호 확인
                </Text>
              </ImageBackground>
            </TouchableOpacity>
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
        {/* 다음 버튼 */}
        <TouchableOpacity
          style={{
            width: "80%",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            backgroundColor: "#be1d2d"
          }}
          onPress={() => navigation.push("FindUserPasswordStep2")}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
            다음
          </Text>
        </TouchableOpacity>
        <View style={{ height: 66 }} />
      </View>
    </SafeAreaView>
  );
};

export default FindUserPasswordStep1;
