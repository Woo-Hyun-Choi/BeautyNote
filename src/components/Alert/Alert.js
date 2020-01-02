import React from "react";
import {
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* 알람 내역 */}
          <View
            style={{
              minHeight: 80,
              display: "flex",
              flexDirection: "row",
              marginBottom: 12,
              paddingHorizontal: 15,
              borderBottomColor: "#e2e2e2",
              borderBottomWidth: 0.5
            }}
          >
            {/* 알람 작성자 프로필 이미지 */}
            <Image
              style={{
                width: 46.7,
                height: 46.7,
                borderRadius: 40,
                marginRight: 8.7,
                backgroundColor: "#000",
                alignSelf: "center"
              }}
              source={require("../../assets/images/main_mypage_t.png")}
            />
            {/* 알람 작성자 이름, 알람 내용, 알람 시간 */}
            <View style={{ flex: 1, width: "100%" }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center"
                }}
              >
                {/* 알람 내용, 시간 */}
                <View
                  style={{
                    flexDirection: "row"
                  }}
                >
                  {/* 알람 작성자 이름, 알람 내용 */}
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 12,
                      color: "#282828",
                      marginHorizontal: 5,
                      lineHeight: 18,
                      alignSelf: "center"
                    }}
                  >
                    <Text style={{ fontWeight: "800" }}>작성자입니다.</Text>
                    님이 내 게시물에 "좋아요"를 눌렀습니다.
                  </Text>
                </View>
                {/* 알람 시간 */}
                <View style={{ height: 20, paddingHorizontal: 5 }}>
                  <Text
                    style={{
                      fontSize: 10,
                      lineHeight: 20,
                      color: "#bfbfbf"
                    }}
                  >
                    오후 5:12
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%"
  }
});
