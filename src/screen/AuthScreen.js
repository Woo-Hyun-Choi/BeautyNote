import React from "react";
import {View, Text, Image, TouchableOpacity, Platform} from "react-native"  
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Intro from "../components/Intro/Intro"
import Login from "../components/Auth/Login";
import FindUserIDStep1 from "../components/Auth/FindUserID/FindUserIDStep1";
import FindUserIDStep2 from "../components/Auth/FindUserID/FindUserIDStep2";
import FindUserPasswordStep1 from "../components/Auth/FindUserPassword/FindUserPasswordStep1";
import FindUserPasswordStep2 from "../components/Auth/FindUserPassword/FindUserPasswordStep2";
import Signup from "../components/Auth/Signup";
// import Signup from "../components/Auth/Gender";
import Main from "../screen/mainScreen"

const AuthStack = createStackNavigator({
  Intro:{
    screen:Intro,
    navigationOptions:{
      header:null
    }
  },
  Login: {
    screen: Login,
    navigationOptions:{
      header:null
    }
  },
  Main: {
    screen: Main,
    navigationOptions:{
      header:null
    }
  },

  FindId: {
    screen: createStackNavigator({
      FindUserIDStep1: {
        screen: FindUserIDStep1,
        navigationOptions:{
          header:null
        }
      },
      FindUserIDStep2: {
        screen: FindUserIDStep2,
        navigationOptions:{
          header:null
        }
      }
    }),
    navigationOptions: props => {
      const { navigation } = props;
      return {
        title: "아이디 찾기",
        headerTitleStyle: {
          ...Platform.select({
            ios: {},
            android: {
              textAlign: "center",
              flex: 1
            }
          })
        },
        headerLeft: (
          <View />
        ),
        headerRight: <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Image
          style={{
            width: 20,
            height: 24,
            marginRight: 10,
            resizeMode: "contain"
          }}
          source={require("../assets/images/bt_esc.png")}
        />
      </TouchableOpacity>
      };
    }
  },
  FindPw: {
    screen: createStackNavigator({
      FindUserPasswordStep1: {
        screen: FindUserPasswordStep1,
        navigationOptions:{
          header:null
        }
      },
      FindUserPasswordStep2: {
        screen: FindUserPasswordStep2,
        navigationOptions:{
          header:null
        }
      }
    }),
    navigationOptions: props => {
      const { navigation } = props;
      return {
        title: "비밀번호 찾기",
        headerTitleStyle: {
          ...Platform.select({
            ios: {},
            android: {
              textAlign: "center",
              flex: 1
            }
          })
        },
        headerLeft: (
          <View />
        ),
        headerRight: <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Image
          style={{
            width: 20,
            height: 24,
            marginRight: 10,
            resizeMode: "contain"
          }}
          source={require("../assets/images/bt_esc.png")}
        />
      </TouchableOpacity>
      };
    }
  },
  SignUp: {
    screen: Signup,
    navigationOptions: props => {
      const { navigation } = props;
      return {
        title: "회원가입",
        headerTitleStyle: {
          ...Platform.select({
            ios: {},
            android: {
              textAlign: "center",
              flex: 1
            }
          })
        },
        headerLeft: (
          <View />
        ),
        headerRight: <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Image
          style={{
            width: 20,
            height: 24,
            marginRight: 10,
            resizeMode: "contain"
          }}
          source={require("../assets/images/bt_esc.png")}
        />
      </TouchableOpacity>
      };
    }
  }
});

export default createAppContainer(AuthStack);
