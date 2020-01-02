import React, { useState } from 'react'
import GlobalContext from '../../context/global.context'

const GlobalProvider = ({ children }) => {
	const [globalData, setGlobalData] = useState({
		isLogged: false,
		userInfo: {}
	});

	const context = {
		globalData,
		setGlobalData
	}

	return (
			<GlobalContext.Provider value={context}>
				{children}
			</GlobalContext.Provider>
	)
}

export default GlobalProvider
