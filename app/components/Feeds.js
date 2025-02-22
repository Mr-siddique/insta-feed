import React, { PureComponent } from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";

export default class Feeds extends PureComponent {
  render() {
    const { data } = this.props;
    if (!data) return null;

    const { creator, profilePicUrl, postUrl, caption } = data;

    return (
      <View style={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => {}} style={styles.profileImageWrapper}>
            <Image style={styles.profileImage} source={{ uri: profilePicUrl }} />
          </TouchableOpacity>
          <Text style={styles.creatorName}>{creator}</Text>
        </View>

        {/* Post Image */}
        <Image source={{ uri: postUrl }} style={styles.postImage} resizeMode="cover" />

        {/* Caption */}
        <Text style={styles.caption}>{caption}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImageWrapper: {
    marginRight: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  creatorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
    marginTop: 8,
    borderRadius: 8,
  },
  caption: {
    marginTop: 4,
    fontSize: 14,
  },
});


// aditya@wishlink.com