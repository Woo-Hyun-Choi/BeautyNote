import React, { useState } from 'react'
import WriteContext from '../../context/write.context'

const WriteProvider = ({ children }) => {
	const [writeData, setWriteData] = useState({
		data: {
			content: '',
			img_list: '',
			hashTag: '',
		}
	});

	const context = {
		writeData,
		setWriteData
	}

	return (
			<WriteContext.Provider value={context}>
				{children}
			</WriteContext.Provider>
	)
}

export default WriteProvider
