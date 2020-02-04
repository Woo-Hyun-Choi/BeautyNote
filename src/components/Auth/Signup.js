import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import Gender from "./Gender"
import axios from "axios";
import { DEV_SERVER } from "../../setting";
import validateEmail from "../../lib/validateEmail";
import GlobalContext from "../../context/global.context";

const Signup = ({navigation}) => {
  const [data, setData] = useState({
    name: "",
    nickname: "",
    phone: "",
    email: "",
    password: "",
    gender: "F",
    verifyEmail: false,
    verifySMSAuth: false,
    verifyCode: ""
  });
  const [itemSelected, setItemSelected] = useState({
    itemOne:""
  })
  const { globalData, setGlobalData } = useContext(GlobalContext);

  const join = async () => {
    try {
      if (userDataCheck()) {
        const { name, nickname, phone, email, password, gender } = data;
        const response = await axios.post(`${DEV_SERVER}/Account/signUp`, {
          name,
          nickname,
          phone,
          email,
          password,
          gender
        });
        console.log("before navigation")
        console.log(response.data)
        if (response.data.message === "REGISTERED") {
          console.log("after")
          setGlobalData({ ...globalData, isLogged: true });
          navigation.push("Login", )
        } else if (
          response.data.message === "This ID has already been registered."
        ) {
          alert("이미 등록 된 아이디입니다.");
        }
      }
    } catch (error) {
      console.log("SignUp.js join Function Error", error);
      alert("요청에 문제가 있습니다. 잠시후에 다시 요청해주세요.");
    }
  };

  const userDataCheck = () => {
    const {
      name,
      nickname,
      phone,
      email,
      password,
      gender,
      verifyEmail,
      verifyCode
    } = data;

    if (name === "") {
      return alert("이름을 입력해주세요.");
    } else if (nickname === "") {
      return alert("닉네임을 입력해주세요.");
    } else if (phone === "") {
      return alert("전화번호를 입력해주세요.");
    } else if (email === "") {
      return alert("이메일을 입력해주세요.");
    } else if (password === "") {
      return alert("패스워드를 입력해주세요.");
    }
     else if (gender === "") {
      return alert("성별을 선택해주세요.");
    } 
    else if (verifyEmail === "") {
      return alert("이메일 인증을 해주세요.");
    } else if (verifyCode === "") {
      return alert("휴대폰 인증을 해주세요.");
    } else if (!validateEmail(email)) {
      return alert("올바른 이메일을 입력해주세요.");
    }

    return true;
  };

  const sendVerifyCode = async () => {
    try {
      const response = await axios.post(`${DEV_SERVER}/Account/sendSMSAuth`, {
        phone: data.phone,
        type: "SIGNUP"
      });

      console.log("response.data.message", response.data.message);

      if (response.data.message === "SENT") {
        alert("인증번호가 전송되었습니다.");
      } else if (response.data.message === "AlreadyRegisteredNumber") {
        alert("이미 등록 된 전화번호입니다.");
      } else {
        alert("요청에 문제가 있습니다. 잠시후에 다시 요청해주세요.");
      }
    } catch (error) {
      console.log("SignUp.js SendVerifyCode Function Error", error);
      alert("요청에 문제가 있습니다. 잠시후에 다시 요청해주세요.");
    }
  };

  const checkVerifyCode = async () => {
    try {
      const response = await axios.post(`${DEV_SERVER}/Account/verifySMSAuth`, {
        phone: data.phone,
        type: "SIGNUP",
        code: data.verifyCode
      });

      if (response.data.message === "invalidPhoneAuth") {
        alert("인증번호가 올바르지 않습니다.");
      } else if (response.data.message === "expiredPhoneAuth") {
        alert("인증번호가 만료되었습니다.");
      }

      if (response.data.status === "success") {
        alert("인증이 확인되었습니다.");
        setData({
          ...data,
          verifySMSAuth: true
        });
      }
    } catch (error) {
      console.log("SignUp.js checkVerifyCode Error", error);
      alert("에러가 발생했습니다. 잠시후에 다시 시도해주세요.");
    }
  };

  const checkVerifyEmail = async () => {
    try {
      const response = await axios.post(`${DEV_SERVER}/Account/verifyEmail`, {
        email: data.email
      });

      if (response.data.message === "AVAILABLE") {
        alert("사용 가능한 이메일입니다.");
        setData({
          ...data,
          verifySMSAuth: true
        });
      } else {
        alert("사용 불가능한 이메일입니다.");
      }
    } catch (error) {
      console.log("SignUp.js checkVerifyEmail Error", error);
      alert("에러가 발생했습니다. 잠시후에 다시 시도해주세요.");
    }
  };

  const onChange = (text, type) => {
    setData({
      ...data,
      [type]: text
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {/* 상단 컨테이너 */}
        <View style={{ flex: 1, paddingHorizontal: 25 }}>
          {/* 이름 */}
          <View
            style={{ height: 50, flexDirection: "row", marginVertical: 10 }}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ color: "#282828", fontSize: 14 }}>이름</Text>
            </View>
            <TextInput
              style={{
                flex: 2,
                fontSize: 12.7,
                borderBottomColor: "#282828",
                borderBottomWidth: 0.5
              }}
              placeholder="이름을 입력해주세요"
              onChangeText={text => onChange(text, "name")}
            />
          </View>

          {/* 닉네임 */}
          <View
            style={{ height: 50, flexDirection: "row", marginVertical: 10 }}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ color: "#282828", fontSize: 14 }}>닉네임</Text>
            </View>
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
                style={{
                  flex: 1,
                  fontSize: 12.7,
                  color: "#282828"
                }}
                placeholder="닉네임을 입력해주세요"
                onChangeText={text => onChange(text, "nickname")}
              />
              <TouchableOpacity
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => alert("사용가능한 닉네임입니다.")}
              >
                <ImageBackground
                  style={{
                    width: 86,
                    height: 33,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  resizeMode="contain"
                  source={require("../../assets/images/bt_sub_black.png")}
                >
                  <Text
                    style={{ fontSize: 10, color: "#fff", textAlign: "center" }}
                  >
                    중복확인
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>

          {/* 휴대폰번호 */}
          <View
            style={{ height: 50, flexDirection: "row", marginVertical: 10 }}
          >
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
                style={{
                  flex: 1,
                  fontSize: 12.7,
                  color: "#282828"
                }}
                placeholder="- 제외"
                name={"phone"}
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
                  source={require("../../assets/images/bt_sub_gray.png")}
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
          <View
            style={{ height: 50, flexDirection: "row", marginVertical: 10 }}
          >
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
                style={{
                  flex: 1,
                  fontSize: 12.7,
                  color: "#282828"
                }}
                placeholder="인증번호 확인"
                keyboardType="numeric"
                onChangeText={text => onChange(text, "verifyCode")}
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
                  source={require("../../assets/images/bt_sub_rad.png")}
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

          {/* 이메일 */}
          <View
            style={{ height: 50, flexDirection: "row", marginVertical: 10 }}
          >
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
                style={{
                  flex: 1,
                  fontSize: 12.7,
                  color: "#282828"
                }}
                keyboardType="email-address"
                placeholder="이메일을 입력해주세요"
                onChangeText={text => onChange(text, "email")}
              />
              <TouchableOpacity
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => checkVerifyEmail()}
              >
                <ImageBackground
                  style={{
                    width: 86,
                    height: 33,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  resizeMode="contain"
                  source={require("../../assets/images/bt_sub_black.png")}
                >
                  <Text
                    style={{ fontSize: 10, color: "#fff", textAlign: "center" }}
                  >
                    중복확인
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>

          {/* 비밀번호 */}
          <View
            style={{ height: 50, flexDirection: "row", marginVertical: 10 }}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ color: "#282828", fontSize: 14 }}>비밀번호</Text>
            </View>
            {/* 비밀번호 기재란 */}
            <TextInput
              style={{
                flex: 2,
                borderBottomColor: "#282828",
                borderBottomWidth: 0.5
              }}
              placeholder="비밀번호를 입력해주세요"
              onChangeText={text => onChange(text, "password")}
              secureTextEntry={true}
            />
          </View>

          {/* 성별 */}
          <View
            style={{
              flex: 1,
              height: 50,
              flexDirection: "row",
              marginVertical: 10
            }}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ color: "#282828", fontSize: 14 }}>성별</Text>
            </View>
            {/* 성별 선택란 */}
            <View
              style={{
                flex: 2,
                display: "flex",
                height:50
              }}
            >
              <View style={{ flex:1 }}>
                <Gender />
              </View>
              {/* <TouchableOpacity>
                <Image
                  resizeMode="contain"
                  style={{ width: 100, height: 30 }}
                  source={require("../../assets/images/bt_girl_n.png")}
                  //   source={select ? require("../../assets/images/bt_girl_t.png")
                  //  				 : require("../../assets/images/bt_girl_n.png") }
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  resizeMode="contain"
                  style={{ width: 100, height: 30 }}
                  source={require("../../assets/images/bt_men_n.png")}
                  //   source={select ? require("../../assets/images/bt_men_t.png")
                  //  				 : require("../../assets/images/bt_men_n.png") }
                />
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
        {/* 나눔 바 */}
        <View
          style={{
            height: 5,
            width: "100%",
            backgroundColor: "#f5f5f5",
            marginVertical: 15
          }}
        />

        {/* 하단 컨테이너 */}
        <View style={{ flex: 1, paddingHorizontal: 25 }}>
          {/* 약관 1번 */}
          <View style={{ paddingVertical: 15 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ fontSize: 15, paddingVertical: 15 }}>
                약관동의
              </Text>
              <TouchableOpacity>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../../assets/images/bt_check_t.png")}
                />
              </TouchableOpacity>
            </View>
            <Text
              numberOfLines={4}
              style={{
                fontSize: 12,
                color: "#b4b4b4",
                lineHeight: 20,
                paddingVertical: 15
              }}
            >
              약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.
              약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.
              {/* {약관.약관.length > 150 ? `${약관.약관.substring(0, 147)}...` : 약관.약관} */}
              <Text style={{ color: "#be1d2d" }}>더보기 ></Text>
            </Text>
          </View>

          {/* 약관 2번 */}
          <View style={{ paddingVertical: 15 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ fontSize: 15, paddingVertical: 15 }}>
                약관동의
              </Text>
              <TouchableOpacity>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../../assets/images/bt_check_n.png")}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: "#b4b4b4",
                lineHeight: 20,
                paddingVertical: 15
              }}
            >
              약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.
              약관입니다.약관입니다.약관입니다.약관입니다.약관입니다.
              {/* {약관.약관.length > 150 ? `${약관.약관.substring(0, 147)}...` : 약관.약관} */}
              <Text style={{ color: "#be1d2d" }}>더보기 ></Text>
            </Text>
          </View>

          {/* 완료 버튼 */}
          <TouchableOpacity
            style={{
              width: "80%",
              height: 50,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              backgroundColor: "#be1d2d"
            }}
            onPress={() => join()}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
              완료
            </Text>
          </TouchableOpacity>
          <View style={{ height: 66 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
