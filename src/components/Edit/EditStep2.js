import React, { useContext, useState } from "react";
import {
	SafeAreaView,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	Dimensions
} from "react-native";
import ImagePicker from 'react-native-image-picker';
import { GET_USER_TOKEN } from "../../lib/getToken";
import axios from "axios";
import { DEV_SERVER } from "../../setting";
import WriteContext from "../../context/write.context";

const { width, height } = Dimensions.get("window");

const options = {
	title: '프로필 사진 설정',
	storageOptions: {
		skipBackup: true,
		path: 'images'
	},
	cancelButtonTitle: '닫기',
	takePhotoButtonTitle: '사진 촬영하기',
	chooseFromLibraryButtonTitle: '앨범에서 사진 선택',
	tintColor: '#ff',
};

const EditStep2 = () => {
	const [list, setList] = useState([]);
	const { writeData, setWriteData } = useContext(WriteContext)

	const createList = ({ uri, name }) => {
		const createList = list.concat({ uri, name })

		setList(createList)
	}

	const uploadPhoto = async ({ uri, name, type }) => {
		try {
			uri = Platform.OS === "android" ? uri : uri.replace("file://", "")
			const Authorization = await GET_USER_TOKEN();
			const formData = new FormData()

			formData.append("file", {
				uri,
				name,
				type
			});

			const response = await axios.post(`${DEV_SERVER}/File/fileUpload`, formData, {
				headers: {
					Authorization,
					'Content-Type': 'multipart/form-data'
				},
			})

			if(response.data.data) {
				setWriteData({
					...writeData,
					data: {
						...writeData.data,
						img_list: writeData.data.img_list + response.data.data.file_no.toString() + ','
					}
				})
				createList({ uri, name })
			} else {
				alert('파일을 추가 할 수 없습나디.')
			}
		} catch(error) {
			console.log('EditStep2.js uploadPhoto Function Error', error)
			alert('요청에 문제가 있습니다.')
		}
	}

	const getPhoto = () => {
		if(list.length < 10) {
			try {
				ImagePicker.showImagePicker(options, (response) => {
					if(response.didCancel) {
						console.log('User cancelled image picker');
					} else if(response.error) {
						console.log('ImagePicker Error: ', response.error);
					} else if(response.customButton) {
						console.log('User tapped custom button: ', response.customButton);
					} else {
						uploadPhoto({ uri: response.uri, name: response.fileName, type: response.type })
					}
				})
			} catch(error) {
				console.log('Error =>', error)
			}
		} else {
			alert('이미지는 최대 10개 까지 올릴 수 있습니다.')
		}
	}

	const uploadedProfileCheck = () => {
		alert('hi')
	}

	return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={{ flex: 1, height: "100%" }}>
					{/* 작성자 프로필 */}
					<View
							style={{
								flex: 1,
								display: "flex"
							}}
					>
						<ScrollView
								showsVerticalScrollIndicator={false}
								contentContainerStyle={{ flex: 1 }}
						>
							<View
									style={{
										flex: 1,
										flexDirection: "row",
										flexWrap: "wrap"
									}}
							>
								{
									list.map((data, index) => (
											<TouchableOpacity onPress={() => uploadedProfileCheck()} key={index}>
												<Image
														resizeMode="contain"
														style={{
															width: width / 3.1,
															height: width / 3.1,
															margin: width / 200,
														}}
														source={{ uri: data.uri }}
												/>
											</TouchableOpacity>
									))
								}
								<TouchableOpacity onPress={() => getPhoto()}>
									<Image
											resizeMode="contain"
											style={{
												width: width / 3.1,
												height: width / 3.1,
												margin: width / 200
											}}
											source={require("../../assets/images/bt_add_image.png")}
									/>
								</TouchableOpacity>
							</View>
						</ScrollView>

						{/* 다음 버튼 */}
						<View style={{ height: 80, justifyContent: "flex-end" }}>
							<TouchableOpacity
									style={{
										width: "70%",
										height: 50,
										alignItems: "center",
										justifyContent: "center",
										alignSelf: "center",
										borderRadius: 10,
										backgroundColor: "#be1d2d",
										marginVertical: 15
									}}
									// onPress={() => onWriteTest()}
							>
								<Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
									다음
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</SafeAreaView>
	);
}

export default EditStep2
