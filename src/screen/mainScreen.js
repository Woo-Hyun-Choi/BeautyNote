import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import NewsPeed from "../components/Main/MainPage";
import Follow from "../components/Follow/FollowStep1";
import Edit from "../components/Edit/EditStep1";
import Alert from "../components/Alert/Alert";
import MyPage from "../components/MyPage/MyPage";
import MyPageDetail from "../components/MyPage/MyPageDetail";
import Settings from "../components/Settings/Settings";
import MainPageDetail from "../components/Main/MainPageDetail";
import FollowStep2 from "../components/Follow/FollowStep2";
import EditStep2 from "../components/Edit/EditStep2";
import EditStep3 from "../components/Edit/EditStep3";


const NewsPeedStack = createStackNavigator({
  NewsPeed: {
    screen: NewsPeed
  },
  NewPeedDetailPage: {
    screen: MainPageDetail
  },
  OtherUserPage: {
    screen: FollowStep2,
    navigationOptions: {
      // tabBarLabel: '내정보',
    }
  }
});

const FollowStack = createStackNavigator({
  Follow: {
    screen: Follow
  },
  OtherUserPage: {
    screen: FollowStep2,
    navigationOptions: {
      // tabBarLabel: '내정보',
    }
  }
});

const EditStack = createStackNavigator({
  Edit: {
    screen: Edit
  },
  EditStep2: {
    screen: EditStep2
  },
  EditStep3: {
    screen: EditStep3
  }
});

const AlertStack = createStackNavigator({
  Alert: {
    screen: Alert
  }
});

const MyPageStack = createStackNavigator({
  MyPage: {
    screen: MyPage
  },
  MyPageDetail:{
    screen: MyPageDetail
  },
  Settings: {
    screen: Settings
  }
});

const MainTabs = createBottomTabNavigator(
  {
    NewsPeed: {
      screen: NewsPeedStack,
      navigationOptions: {
        // tabBarLabel: '뉴스피드',
        tabBarIcon: ({ focused }) => (
          <Image
            resizeMode="contain"
            focused={focused}
            source={
              focused
                ? require("../assets/images/main_feed_t.png")
                : require("../assets/images/main_feed_n.png")
            }
            style={{ width: "50%", height: "50%" }}
            size={24}
          />
        )
      }
    },
    Follow: {
      screen: FollowStack,
      navigationOptions: {
        // tabBarLabel: '팔로우',
        tabBarIcon: ({ focused }) => (
          <Image
            resizeMode="contain"
            focused={focused}
            source={
              focused
                ? require("../assets/images/main_followlist_t.png")
                : require("../assets/images/main_followlist_n.png")
            }
            style={{ width: "50%", height: "50%" }}
            size={24}
          />
        )
      }
    },
    Edit: {
      screen: EditStack,
      navigationOptions: {
        // tabBarLabel: '글쓰기',
        tabBarIcon: ({ focused }) => (
          <Image
            resizeMode="contain"
            focused={focused}
            source={
              focused
                ? require("../assets/images/main_edit_t.png")
                : require("../assets/images/main_edit_n.png")
            }
            style={{ width: "50%", height: "50%" }}
            size={24}
          />
        )
      }
    },
    Alert: {
      screen: AlertStack,
      navigationOptions: {
        // tabBarLabel: '알림',
        tabBarIcon: ({ focused }) => (
          <Image
            resizeMode="contain"
            focused={focused}
            source={
              focused
                ? require("../assets/images/main_alarm_t.png")
                : require("../assets/images/main_alarm_n.png")
            }
            style={{ width: "50%", height: "50%" }}
            size={24}
          />
        )
      }
    },
    MyPage: {
      screen: MyPageStack,
      navigationOptions: {
        // tabBarLabel: '내정보',
        tabBarIcon: ({ focused }) => (
          <Image
            resizeMode="contain"
            focused={focused}
            source={
              focused
                ? require("../assets/images/main_mypage_t.png")
                : require("../assets/images/main_mypage_n.png")
            }
            style={{ width: "50%", height: "50%" }}
            size={24}
          />
        )
      }
    }
  },
  {
    initialRouteName: "NewsPeed",
    tabBarOptions: {
      //   activeTintColor: "#000",
      //   inactiveTintColor: "#fff",
      //   labelStyle: {
      //     fontSize: 12
      //   },
      style: {
        backgroundColor: "#fff"
        // paddingTop: 3
      },
      showLabel: false,
    },
    navigationOptions: ({ navigation }) => ({
      tabBarOnPress: (scene, jumpToIndex) => {
        console.log('onPress:', scene.route);
        jumpToIndex(scene.index);
      },
    }),
  }
);

export default createAppContainer(MainTabs);
