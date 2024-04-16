import { Image, Text, View, StyleSheet, Button,} from 'react-native'
import React from 'react';

const UserComment = (props) => {

  return (
    <View style={styles.commentsContainer}>
        <View style={styles.commentBanner}>
            <Text style={styles.userHandleText}>{props.userHandle}</Text>
            <Text style={styles.commentText}>{props.commentText}</Text>
            {/* <Text style={styles.dateText}>{props.date.toString()}</Text> */}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        maxHeight: 500,
        },
   userHandleText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFF"
   },
   commentText: {
    color: "#FFF"
   },
   dateText: {
    fontSize: 12,
    color: "#CCC",
    alignSelf: "flex-end"
   },
   commentsContainer: {
    backgroundColor: "#33658A",
    padding: 8,
    gap: 4,
    // width: "100%",
    justifyContent: "flex-start",
   },
   commentBanner: {
    padding: 8,
    // margin: 8,
    borderWidth: 1,
    borderColor: "#86BBD8"
   }
   
  });

export default UserComment