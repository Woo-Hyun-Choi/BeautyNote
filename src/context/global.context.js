import { createContext } from "react";

const GlobalContext = createContext({
	isLogged: false,
	userInfo: {}
});

export default GlobalContext;
