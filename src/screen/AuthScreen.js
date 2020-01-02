import React from "react";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Login from "../components/Auth/Login";
import FindUserIDStep1 from "../components/Auth/FindUserID/FindUserIDStep1";
import FindUserIDStep2 from "../components/Auth/FindUserID/FindUserIDStep2";
import FindUserPasswordStep1 from "../components/Auth/FindUserPassword/FindUserPasswordStep1";
import FindUserPasswordStep2 from "../components/Auth/FindUserPassword/FindUserPasswordStep2";
import Signup from "../components/Auth/Signup";

const AuthStack = createStackNavigator({
  Login: {
    screen: Login
  },
  FindId: {
    screen: createStackNavigator({
      FindUserIDStep1: {
        screen: FindUserIDStep1
      },
      FindUserIDStep2: {
        screen: FindUserIDStep2
      }
    })
  },
  FindPw: {
    screen: createStackNavigator({
      FindUserPasswordStep1: {
        screen: FindUserPasswordStep1
      },
      FindUserPasswordStep2: {
        screen: FindUserPasswordStep2
      }
    })
  },
  SignUp: {
    screen: Signup
  }
});
