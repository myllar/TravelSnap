import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons';

const PostCounter = (props) => {
  return (
    <View style={styles.container} >
        <Text style={styles.iconText}>Number of posts</Text>
        <View style={styles.iconContainer}>
            
        <Entypo name="images" size={24} color="#F6AE2D" />
        
        
        <View style={styles.numberWrapper}>
            <Text style={styles.counterNumber}>{props.numberOfPosts}</Text>
        </View>
        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        
        // backgroundColor: "#F6AE2D",
        // flexDirection: "",
        backgroundColor: "#2F4858",
        gap: 4,
        alignItems: "center"
        
    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 12
    },
    iconText: {
        fontSize: 12,
        fontWeight: "400",
        color: "#F6AE2D",
    },
    numberWrapper: {
        justifyContent: "center",
        alignItems: "center",
        width: 36,
        height: 36,
        borderColor: "#F6AE2D",
        borderWidth: 2,
        borderRadius: 18,
    },
    counterNumber: {
        fontSize: 18,
        fontWeight: "600",
        color: "#F6AE2D",
    }
  })

export default PostCounter
