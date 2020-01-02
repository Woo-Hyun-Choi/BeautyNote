import { createContext } from "react";

const WriteContext = createContext({
	data: {
		content: '',
		img_list: '',
		hashTag: ''
	}
});

export default WriteContext;
