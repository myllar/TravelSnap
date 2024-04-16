import React from 'react'
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, GestureResponderEvent, ImageSourcePropType } from 'react-native';
import DangerButton from '../DangerButton';


const EditGallery = (props) => {



  return (
    <View style={{justifyContent: "center", alignItems: "center", gap: 20}}>
        <Image source={props.imgUri}
        style={{width: 200, height: 200, margin: 20, marginBottom: 0}}
        />
        <DangerButton btnFunction={props.deleteFunction} text="Delete Post"/>
    </View>
  )
}

export default EditGallery
