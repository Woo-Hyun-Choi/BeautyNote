import React, { Component } from "react";
import { View } from "react-native"
import {
  Container,
  Header,
  Content,
  ListItem,
  Text,
  Radio,
  Right
} from "native-base";
export default class RadioButtonExample extends Component {
  constructor() {
    super();
    this.state = {
      itemSelected: "Female"
    };
  }
  render() {
    const radioItem = [
        { label: '여성', value: 'F' },
        { label: '남성', value: 'M' }
    ];
    return (
      <Container>
        {/* <Header /> */}
        <Content>
        <View style={{flex:1, flexDirection:"row", justifyContent:"space-around"}}>
          <ListItem
            style={{ width: 100, height:50, justifyContent: "space-between" }}
            onPress={() => this.setState({ itemSelected: "Female" })}
            selected={this.state.itemSelected == "Female"}
          >
            <Text
              style={
                this.state.itemSelected == "Female"
                  ? { color: "#be1d2d" }
                  : { color: "#000" }
              }
            >
              여성
            </Text>
            <Right>
              <Radio
                color={"#000"}
                selectedColor={"#be1d2d"}
                selected={this.state.itemSelected == "Female"}
              />
            </Right>
          </ListItem>
          <ListItem
            style={{ width: 100, height:50, justifyContent: "space-between" }}
            onPress={() => this.setState({ itemSelected: "Male" })}
            selected={this.state.itemSelected == "Male"}
          >
            <Text
              style={
                this.state.itemSelected == "Male"
                  ? { color: "#be1d2d" }
                  : { color: "#000" } 
              }
            >
              남성
            </Text>
            <Right>
              <Radio
                color={"#000"}
                selectedColor={"#be1d2d"}
                selected={this.state.itemSelected == "Male"}
              />
            </Right>
          </ListItem></View>
        </Content>
      </Container>
    );
  }
}
