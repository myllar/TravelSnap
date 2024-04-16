import React from 'react'
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';

const Index = () => {
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity>
        <FontAwesome name="home" size={36} color="#86BBD8" />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome name="camera" size={36} color="#86BBD8" />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome name="map" size={36} color="#86BBD8" />
        {/* <FontAwesome name="map-marker" size={24} color="black" /> */}
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome name="user" size={36} color="#86BBD8" />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome name="gear" size={36} color="#86BBD8" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    navContainer: {
        flexDirection: "row",
        padding: 24,
        minWidth: "auto",
        // backgroundColor:  "#33658A",
        backgroundColor: "#2F4858",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderTopWidth: 2,
        borderColor: "#86BBD8",
        bottom: 0
    },
  });

export default Index
