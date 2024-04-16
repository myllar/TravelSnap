import React from 'react'
import { Button, StyleSheet, Text, View, TouchableOpacity, GestureResponderEvent } from 'react-native';


const Index = (props: { btnFunction: ((event: GestureResponderEvent) => void) | undefined; text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
  return (
   <TouchableOpacity  onPress={props.btnFunction} >
     <View style={styles.btnContainer}>
      <Text style={styles.btnText}>{props.text}</Text>
    </View>
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btnContainer: {
        padding: 12,
        minWidth: 120,
        backgroundColor: "#33658A",
        // backgroundColor:"#86BBD8",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#86BBD8"
    },
    btnText: {
        color: "#FFF",
        fontSize: 24,

    }
  });

export default Index