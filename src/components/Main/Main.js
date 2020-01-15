import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../context/global.context";
import AsyncStorage from "@react-native-community/async-storage";
import { GET_USER_TOKEN } from "../../lib/getToken";
import axios from "axios";
import { DEV_SERVER } from "../../setting";
import Intro from "../../screen/AuthScreen";
import Login from "../Auth/Login";
import MyPage from "../../screen/mainScreen";

const Main = ({ navigation }) => {
  const [isLogged, setIsLogged] = useState(false);
  const { globalData, setGlobalData } = useContext(GlobalContext);
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    findToken();
  }, []);

  useEffect(() => {
    if (Object.keys(globalData.userInfo).length === 0) {
      setLimit(limit + 1);
      if (limit < 1) {
        getUserDetailData();
      }
    }
  }, [globalData]);
  

  const findToken = async () => {
    const token = await AsyncStorage.getItem("@USER_TOKEN");
    if (token !== null) {
      setIsLogged(true);
    }
  };

  const getUserDetailData = async () => {
    try {
      const Authorization = await GET_USER_TOKEN();
      const response = await axios.post(
        `${DEV_SERVER}/Account/userInfo`,
        {},
        { headers: { Authorization } }
      );

      if (
        response.data.message === "SignTokenInvalid" ||
        response.data.message === "NoSignToken"
      ) {
        return await AsyncStorage.removeItem("@USER_TOKEN");
      }

      if (response.data.status === "SUCCESS") {
        console.log({ ...globalData, userInfo: response.data.data });
        setGlobalData({ ...globalData, userInfo: response.data.data });
      } else {
        alert("요청에 성공하였으나 문제가 있습니다.");
      }
    } catch (error) {
      console.log("Main.js getUserDetailData Function Error", error);
      alert("요청에 문제가 있습니다.");
    }
  };

  return (
    <>
      {isLogged == true ? (
        Object.keys(globalData.userInfo).length > 0 && <MyPage />
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Main;
