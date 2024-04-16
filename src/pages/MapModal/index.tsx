import React from 'react'
import { Button, StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
// import UserImage from '../../components/UserImage'
// import EditGallery from '../../components/EditGallery'
// import SplashAnimation from '../../components/SplashAnimation';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
// import { Float } from 'react-native/Libraries/Types/CodegenTypes';

const MapModal = (props: { latitude: number; longitude: number; }) => {

 
  
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: props.latitude,
          longitude: props.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >

        <Marker
        coordinate={{latitude: props.latitude, longitude: props.longitude}}
        />
        
      </MapView>
    </SafeAreaView>

    //      ######### VISER SPLASH SCREEN FOR TESTING =) ########
      //   <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      //     <SplashAnimation />
      //           {/* <Text> HELLO FROM MAP VIEW </Text> */}
      //   {/* <UserImage imgUrl={require(userImage)} /> */}
      // </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

export default MapModal;
