import React, { useState, useContext } from "react";
import {
	SafeAreaView,
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Dimensions
} from "react-native";
import WriteContext from "../../context/write.context";
import GlobalContext from "../../context/global.context";

const { width, height } = Dimensions.get("window");

const EditStep1 = () => {
	const [content, setContent] = useState('');
	const { globalData, setGlobalData } = useContext(GlobalContext)
	const { writeData, setWriteData } = useContext(WriteContext)

	const saveComment = () => {
		setWriteData({
			...writeData,
			data: {
				...writeData.data,
				content
			}
		})
	}

	return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={{ flex: 1, height: "100%", backgroundColor: "#f5f5f5" }}>
					{/* 작성자 프로필 */}
					<View
							style={{
								flex: 1,
								display: "flex"
							}}
					>
						{/* 작성자 프로필 사진, 작성자 이름 */}
						<View
								style={{
									flexDirection: "row",
									paddingVertical: 20,
									paddingHorizontal: 15,
									borderBottomColor: "#e2e2e2",
									borderBottomWidth: 0.5
								}}
						>
							{/* 작성자 프로필 사진 */}
							<Image
									style={{
										width: 46.7,
										height: 46.7,
										borderRadius: 40,
										marginRight: 8.7,
									}}
									source={{ uri: globalData.userInfo.img }}
							/>
							{/* 작성자 이름 */}
							<View style={{ flex: 1 }}>
								<View
										style={{
											flex: 1,
											width: "100%",
											flexDirection: "row",
											justifyContent: "space-between",
											alignItems: "center",
											alignSelf: "center"
										}}
								>
									<Text
											style={{
												width: width,
												color: "#282828",
												fontSize: 12,
												fontWeight: "700"
											}}
									>
										{globalData.userInfo.nickname}
									</Text>
								</View>
							</View>
						</View>
						<ScrollView
								showsVerticalScrollIndicator={false}
								contentContainerStyle={{ flex: 1, width: "100%", height: "100%" }}
						>
							{/* 게시물 내용 */}
							<View
									style={{
										flex: 1,
										width: width,
										paddingHorizontal: 15
									}}
							>
								<TextInput
										autoFocus={true}
										multiline={true}
										style={{
											flex: 1,
											maxWidth: "100%",
											fontSize: 12.7,
											color: "#282828",
											lineHeight: 20
										}}
										placeholder="내용을 입력해주세요!"
										onChangeText={(text) => setContent(text)}
								/>
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
									onPress={() => saveComment()}
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

export default EditStep1
