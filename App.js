import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import axios from "axios";
import { DEV_SERVER } from "./src/setting";
import GlobalProvider from "./src/containers/GlobalProvider/GlobalProvider";
import WriteProvider from "./src/containers/WriteProvider/WriteProvider";
import Main from "./src/components/Main/Main";

const App = () => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    callAPI();
  }, []);

  const callAPI = async () => {
    try {
      const response = await axios.get(`${DEV_SERVER}/State/serverState`);

      if (response.data.message === "ALIVE") {
        setStatus(true);
      } else {
        alert("서버 응답이 올바르지 않습니다.");
      }
    } catch (error) {
      console.log("App.js API Call Error", error);
      alert("서버에서 에러가 발생했습니다.");
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {status && (
        <GlobalProvider>
          <WriteProvider>
            <Main />
          </WriteProvider>
        </GlobalProvider>
      )}
    </>
  );
};

export default App;
