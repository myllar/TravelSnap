import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

const Avatar = (props) => {
  return (
    <View style={[styles.avatar, {backgroundColor: props.color}]}>
        <Text style={styles.avatarLetter}>{props.user.charAt(0).toUpperCase()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#F6AE2D",
        alignItems: "center",
        justifyContent: "center"
       },
       avatarLetter: {
        color: "#2F4858",
        fontSize: 32,
        fontWeight: "900"
       },
  });


export default Avatar
