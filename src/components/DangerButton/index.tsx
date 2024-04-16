import React from 'react'
import { TouchableOpacity, View, Text} from 'react-native'

const DangerButton = (props) => {
  return (
    <TouchableOpacity onPress={props.btnFunction}>
      <View style={{backgroundColor: "red", padding: 8, borderColor: "#000", borderWidth: 1, alignItems:"center", justifyContent: "center"}}>
        <Text style={{ color: "white", fontWeight: "500"}}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default DangerButton
