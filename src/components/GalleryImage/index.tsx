import { Image, Text, View, StyleSheet, Button, TouchableOpacity, ImageSourcePropType, Modal} from 'react-native'
import { FontAwesome5, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import GalleryImageComments from '../GalleryImageComments';
import { useState } from 'react';
import React from 'react';

import MapModal from '../../pages/MapModal';
import Avatar from '../Avatar';

const GalleryImage = (props) => {

    const [showComments, setShowComments] = useState(false)

    const [ticketColor, setTicketColor] = useState("#2F4858")

    const [showMapModal, setShowMapModal] = useState(false)

    const likeFunction = () => {
      if (ticketColor == "#2F4858"){
        setTicketColor("#F6AE2D")
        // console.log("Liked image")
      } else {
        setTicketColor("#2F4858")
        // console.log("Unliked image")
      }
    }

    const mapFunction = () => {
      if (showMapModal) {
        setShowMapModal(false)

      } else {
        setShowMapModal(true)
      } 
    }

  return (
    <View style={styles.container}>

    {/* MODAL STARTER HER! */}
    <Modal
        animationType="slide"
        transparent={true}
        visible={showMapModal}
        onRequestClose={() => {
          setShowMapModal(false);
        }}>

      <MapModal latitude={parseFloat(props.latitude)} longitude={parseFloat(props.longitude)} />
        <TouchableOpacity onPress={mapFunction} style={styles.closeMapButton}>
            <Text style={styles.closeMapButtonText}>Close map</Text>
        </TouchableOpacity>
      </Modal>

    {/* MODAL SLUTTER HER!!! */}




      <TouchableOpacity onPress={likeFunction} style={styles.ticketContainer} >
        <View style={[styles.ticketCircle, {backgroundColor: ticketColor}]}>
          <MaterialCommunityIcons name="ticket-confirmation-outline" size={28} color="#FFF" />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={mapFunction} style={styles.mapPinContainer} >
        <View style={styles.mapPinCircle}>
        <Feather name="map-pin" size={24} color="#FFF" />
        </View>
      </TouchableOpacity>

        <Image source={props.imageUri} style={styles.image}></Image>
        <View style={styles.descriptionBanner}>


{/* GJØR EGET KOMPONENT!!! */}
            {/* <View style={styles.avatar}>
              <Text style={styles.avatarLetter}>{props.ownerUserHandle.charAt(0).toUpperCase()}</Text>
            </View> */}
            <Avatar user={props.ownerUserHandle} color={"#F6AE2D"} />
{/* DETTE ALTSÅ.... */}


            <View>
                <Text style={styles.userHandleText}>{props.ownerUserHandle}</Text>
                <Text style={styles.descriptionText}>{props.imageDescription}</Text>
                
            </View>
            <TouchableOpacity onPress={() => {showComments ? setShowComments(false) : setShowComments(true)}}>
                {showComments ? <FontAwesome5 name="chevron-up" size={24} color="#FFF" /> : <FontAwesome5 name="chevron-down" size={24} color="#FFF" />}
            </TouchableOpacity>
        </View>

        {showComments ? 
        // <Text>{props.text}!</Text>
        <GalleryImageComments
          id={props.id}
          comments={props.comments}/> 
        :
         <></>}
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginBottom: 16   
    },
    ticketContainer: {
      position: "absolute",
      zIndex: 200,
      top: 8,
      right: 8
    },
    ticketCircle: {
      width: 42,
      height: 42,
      borderRadius: 21,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#FFF",
      borderWidth: 2
    },

    mapPinContainer: {
      position: "absolute",
      zIndex: 200,
      top: 8,
      left: 8
    },
    mapPinCircle: {
      width: 42,
      height: 42,
      borderRadius: 21,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#FFF",
      borderWidth: 2,
      backgroundColor: "#F6AE2D"
    },

    closeMapButton: {
      justifyContent: "center", 
      alignItems:"flex-end",
      
    },

    closeMapButtonText: {
      backgroundColor:"red",
      padding: 20,
      color: "#FFF",
      fontWeight: "600",
      fontSize: 18,
      borderWidth: 2,
      borderColor: "#FFF"
  },

   image: {
    height: 300,
    width: "100%",
   },
   descriptionBanner: {
    backgroundColor: "#2F4858",
    flexDirection: "row",
    padding: 12,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
   },
   userHandleText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F6AE2D",
    alignSelf: "center"
   },
   descriptionText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FFF",
    maxWidth: "80%",
    alignSelf: "center"
   },
  });


export default GalleryImage