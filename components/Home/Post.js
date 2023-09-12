import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Divider } from "react-native-elements";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { db, firebase } from "../../firebase";

const postFooterIcons = [
  {
    name: "Like",
    imageUrl: "https://img.icons8.com/material-outlined/60/ffffff/like--v1.png",
    likedUrl: "https://img.icons8.com/ios-filled/50/F30000/like--v1.png",
  },
  {
    name: "Comment",
    imageUrl:
      "https://img.icons8.com/material-outlined/60/ffffff/speech-bubble--v1.png",
  },
  {
    name: "Share",
    imageUrl:
      "https://img.icons8.com/material-outlined/60/ffffff/filled-sent.png",
  },
  {
    name: "Save",
    imageUrl:
      "https://img.icons8.com/material-outlined/60/ffffff/bookmark-ribbon--v1.png",
  },
];

const Post = ({ post }) => {
  const handleLike = (post) => {
    const currentLikeStatus = !post.likes_by_user.includes(
      firebase.auth().currentUser.email
    );

    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_user: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email
            ),
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => console.error("Error updating docoument: ", error));
  };
  return (
    <View style={{ marginBottom: 10 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, margin: 10 }}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
      alignItems: "center",
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: post.profilePict }} style={styles.story} />
      <Text style={{ color: "white", marginLeft: 5, fontWeight: "700" }}>
        {post.user}
      </Text>
    </View>
    <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
  </View>
);

const PostImage = ({ post }) => (
  <View
    style={{
      width: "100%",
      height: 350,
    }}
  >
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = ({ handleLike, post }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View
        style={{
          flexDirection: "row",
          width: "32%",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => handleLike(post)}>
          <Image
            style={styles.footerIcon}
            source={{
              uri: post.likes_by_user.includes(
                firebase.auth().currentUser.email
              )
                ? postFooterIcons[0].likedUrl
                : postFooterIcons[0].imageUrl,
            }}
          />
        </TouchableOpacity>
        <Icon
          imgStyle={styles.footerIcon}
          imgUrl={postFooterIcons[1].imageUrl}
        />
        <Icon
          imgStyle={styles.footerIcon}
          imgUrl={postFooterIcons[2].imageUrl}
        />
      </View>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
    </View>
  );
};

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ color: "white", fontWeight: "600" }}>
      {post.likes_by_user.length.toLocaleString("en")} likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "bold" }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const CommentSection = ({ post }) => {
  const length = post.comments.length;
  return (
    <View style={{ marginTop: 5 }}>
      {post.comments.length !== 0 ? (
        <Text style={{ color: "gray" }}>
          {post.comments.length > 1
            ? `View all ${length} comments`
            : `View ${length} comment`}
        </Text>
      ) : null}
    </View>
  );
};

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ marginTop: 5 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "bold" }}>{comment.user}</Text>
          <Text> {comment.comment}</Text>
        </Text>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#da2e64",
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
});

export default Post;
