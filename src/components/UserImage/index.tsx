import { reload } from 'firebase/auth'
import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
// import "user.jpg" from '´./src/assets/'

const Index = (props: {
  [x: string]: ((event: GestureResponderEvent) => void) | undefined; imgUrl: any 
}) => {

  
  return (
    <View style={styles.userImageContainer}>
      <Image source={props.imgUrl} style={styles.userImage}/>
      <TouchableOpacity onPress={props.editFunction}>
        <View style={styles.editImageBtnContainer}>
        <FontAwesome style={styles.editImageBtn} name="pencil" size={32}/>
        </View>
      </TouchableOpacity>
      {/* <Text> ProfilBilde</Text> */}
    </View>
  )
}


const styles = StyleSheet.create ({
    userImageContainer: {
      flex: 1,
      // width: 200,
      height: 280,
      justifyContent: "center",
      alignItems: "center",

    },
    userImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#86BBD8",
        // position: "relative"
    },
    editImageBtnContainer: {
      position: "relative",
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
      bottom: 40,
      left: 60,
      backgroundColor: "#33658A",
      borderWidth: 2,
      borderColor: "#86BBD8"
    },
    editImageBtn: {
      
      color: "#FFF",
      // backgroundColor: "#F00",
      padding: 0,
      // borderRadius: 48,
      

    }
})


export default Index
