import { Link } from "expo-router";
import React, { PureComponent } from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";

export default class Feeds extends PureComponent {
  render() {
    const { data } = this.props;
    if (!data) return null;

    const { creator, profilePicUrl, postUrl, caption } = data;

    return (
     <View style={{height:200,width:200,backgroundColor:"red"}}/>
    );
  }
}
