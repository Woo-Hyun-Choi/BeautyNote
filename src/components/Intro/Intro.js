/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity } from "react-native";

const intro = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#Be1c2d" }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.5 }} />
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          {/* 환영의 말 */}
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "100",
              lineHeight: 45
            }}
          >
            <Text style={{ fontWeight: "800" }}>뷰티노트</Text>에 오신 것을
            환영합니다!{"\n"}
            지금 바로 회원가입 하고{"\n"}
            <Text style={{ fontWeight: "800" }}>다양한 뷰티 정보</Text>를
            만나보세요:)
          </Text>
          {/* 회원가입 바로가기 버튼 */}
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
            onPress={()=>navigation.navigate("Login")}
          >
            <Text style={{ color: "#fff", fontWeight: "800" }}>
              회원가입 바로가기
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 하단 배경 이미지 */}
      <View
        style={{
          flex: 1,
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
