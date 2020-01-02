import AsyncStorage from '@react-native-community/async-storage';

export const GET_USER_TOKEN = async () => {
	return await AsyncStorage.getItem('@USER_TOKEN');
};

// export const inValidTokenCheck = async (message) => {
// 	if (message === 'SignTokenInvalid' || message === 'NoSignToken') {
// 		await AsyncStorage.removeItem('@USER_AUTH_TOKEN');
// 		return true;
// 	} else {
// 		return false;
// 	}
// };
