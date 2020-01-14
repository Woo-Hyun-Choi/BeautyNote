/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity
} from "react-native";

const intro = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#Be1c2d" }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }} />
        <View
          style={{
            flex: 1.4,
            height: "100%",
            paddingHorizontal: 50,
            justifyContent: "space-evenly"
          }}
        >
          {/* 환영의 말 */}
          <Text
            style={{
              fontSize: 13,
              color: "rgb(210, 100, 110)",
              lineHeight: 25
            }}
          >
            <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}>
              뷰티노트 (Beauty Knot)
            </Text>
            {"\n"}
            {"\n"}
            아름다움은 연결되어 있습니다.
            {"\n"}
            어딘가에서 만나고 또 이어집니다.
            {"\n"}
            {"\n"}
            {"\n"}
            <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}>
              아름다움에 관한 모든 것.
            </Text>
            {"\n"}
            {"\n"}
            믿을 수 있는 정보,
            {"\n"}
            신뢰할 수 있는 전문가를
            {"\n"}
            만나보세요.{"\n"}
          </Text>
          {/* 회원가입 바로가기 버튼 */}
          <TouchableOpacity
            style={{
              width: "100%",
              height: 50,
              borderRadius: 10,
              borderWidth: 0.8,
              borderColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center"
            }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ color: "#fff", fontWeight: "800" }}>
              회원가입 바로가기 >
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 하단 배경 이미지 */}
      <View
        style={{
          flex: 0.6,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          alignSelf: "flex-end"
        }}
      >
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
      </View>
    </SafeAreaView>
  );
};

export default intro;
