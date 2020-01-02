import React from "react";
import { View, Image } from "react-native";
import Swiper from "react-native-swiper";

export default ({ images }) => {
	return (
			<React.Fragment>
				{
					images &&
					<Swiper
							autoplayTimeout={3}
							loop={true}
							dot={<View style={styles.dot}/>}
							activeDot={<View style={styles.activeDot}/>}
							paginationStyle={{ top: null, bottom: 20 }}
					>
						{
							images.map((image, index) => (
									<View style={styles.slide} key={index}>
										<Image
												style={styles.image}
												source={{ uri: image.img }}
										/>
									</View>
							))
						}
					</Swiper>
				}
			</React.Fragment>

	);
};

const styles = {
	slide: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center"
	},
	image: {
		flex: 1,
		width: "100%",
		height: "100%"
	},
	activeDotColor: {},
	activeDotStyle: {
		position: "absolute",
		top: 10,
		left: 25
	},
	paginationStyle: {
		position: "absolute",
		left: null,
		bottom: 0,
		right: 8
	},
	paginationText: {
		color: "black",
		fontSize: 14
	},
	dot: {
		backgroundColor: "#fff",
		width: 6,
		height: 6,
		borderRadius: 4,
		marginHorizontal: 3
	},
	activeDot: {
		backgroundColor: "#be1d2d",
		width: 20,
		height: 6,
		borderRadius: 4,
		marginHorizontal: 3
	}
};
