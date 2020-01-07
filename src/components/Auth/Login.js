/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import axios from "axios";
import { DEV_SERVER } from "../../setting";
import GlobalContext from "../../context/global.context";
import mainScreen from "../../screen/mainScreen";

const Login = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const { globalData, setGlobalData } = useContext(GlobalContext);

  const dataCheck = () => {
    if (data.email === "") {
      alert("이메일을 입력해주세요.");
    } else if (data.password === "") {
      alert("패스워드를 입력해주세요.");
    } else {
      return true;
    }
  };

  const callAPI = async () => {
    try {
      const { email, password } = data;

      const response = await axios.post(`${DEV_SERVER}/Account/signIn`, {
        email,
        password
      });

      const responseData = response.data;

      if (responseData.message !== "WrongAccount") {
        console.log(responseData)
        await AsyncStorage.setItem("@USER_TOKEN", responseData.Authorization);
        setGlobalData({ ...globalData, isLogged: true });
        navigation.navigate("Main")
      } else {
        alert("이메일 혹은 패스워드가 일치 하지 않습니다.");
      }
    } catch (error) {
      console.log("Login.js onLogin Function Error", error);
      alert("요청에 문제가 있습니다. 잠시후에 다시 요청해주세요.");
    }
  };

  const onLogin = () => {
    if (dataCheck()) {
      callAPI();
    }
  };

  const onChange = (text, type) => {
    setData({
      ...data,
      [type]: text
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#Be1c2d" }}>
      <View style={{ flex: 7 }}>
        <View style={{ flex: 0.5 }} />
        {/* 2/4지점 컨테이너 */}
        <View
          style={{
            display:"flex",
            height:300,
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          {/* 아이디, 비밀번호 입력 */}
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              justifyContent: "space-evenly"
            }}
          >
            {/* 아이디 */}
            <TextInput
              style={{
                width: "80%",
                height: 50,
                color: "#fff",
                fontSize: 16,
                fontWeight: "100",
                borderBottomWidth: 0.5,
                borderBottomColor: "#fff"
              }}
              autoCapitalize="none"
              returnKeyType={"next"}
              keyboardType="email-address"
              placeholder="이메일을 입력해주세요!"
              placeholderTextColor={"#bababa"}
              onChangeText={text => onChange(text, "email")}
            />
            {/* 비밀번호 */}
            <TextInput
              style={{
                width: "80%",
                height: 50,
                color: "#fff",
                fontSize: 16,
                fontWeight: "100",
                borderBottomWidth: 0.5,
                borderBottomColor: "#fff"
              }}
              placeholder="비밀번호를 입력해주세요!"
              placeholderTextColor={"#bababa"}
              secureTextEntry={true}
              onChangeText={text => onChange(text, "password")}
            />
          </View>
          <View style={{ height: 50 }} />

          {/* 로그인 버튼 */}
          <TouchableOpacity
            style={{
              width: "70%",
              height: 50,
              borderRadius: 10,
              borderWidth: 0.8,
              borderColor: "#fff",
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => onLogin()}
          >
            <Text style={{ color: "#fff", fontWeight: "800" }}>로그인 </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 하단 배경 이미지 */}
      <View style={{ flex: 1 }}>
        <ImageBackground
          resizeMode="contain"
          style={{
            flex: 1,
            width: 350,
            height: 350,
            position: "absolute",
            right: -60,
            left: null,
            top: null,
            bottom: -50
          }}
          source={require("../../assets/images/bg-intro-1.png")}
        />
        {/* 아이디찾기, 비밀번호찾기, 회원가입에 대한 컴포넌트 */}
        <View
          style={{
            flex: 1,
            width: "100%",
            height: 50,
            backgroundColor: "transparents",
            justifyContent: "flex-end",
            paddingBottom: 20
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "80%",
              height: 20,
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center"
            }}
          >
            {/* 아이디 찾기 버튼 */}
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => navigation.navigate("FindId")}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  textAlign: "right",
                  color: "#fff"
                }}
              >
                아이디 찾기
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: 1,
                height: "100%",
                backgroundColor: "#fff",
                marginHorizontal: 15
              }}
            />
            {/* 비밀번호 찾기 버튼 */}
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => navigation.navigate("FindPw")}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  textAlign: "center",
                  color: "#fff"
                }}
              >
                비밀번호 찾기
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: 1,
                height: "100%",
                backgroundColor: "#fff",
                marginHorizontal: 15
              }}
            />

            {/* 회원가입 버튼 */}
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  textAlign: "left",
                  color: "#fff"
                }}
              >
                회원가입
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;