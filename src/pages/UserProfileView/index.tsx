import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_STORAGE, FIRESTORE_DATABASE } from '../../config/FirebaseConfig';
import { getDownloadURL, ref, deleteObject } from 'firebase/storage';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { IImageData } from '../../Interfaces/IImageData'
import EditGallery from '../../components/EditGallery';
import DangerButton from '../../components/DangerButton';
import PostCounter from '../../components/PostCounter';






import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from 'expo-image-picker';




const UserProfileView = () => {

  const isFocused = useIsFocused();
  const userAccount = FIREBASE_AUTH.currentUser?.email;
  const [data, setData] = useState<IImageData[]>([]);
  const user = FIREBASE_AUTH.currentUser;


  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        try {
          //folder for text values in firestore db:
          const querySnapshot = await getDocs(collection(FIRESTORE_DATABASE, "PostedImages"));
          if (user) {

            //add filter for displaying current users posts.
            const filterOnOwPosts = query(collection(FIRESTORE_DATABASE, "PostedImages"), where("user", "==", user.uid));
            const querySnapshot = await getDocs(filterOnOwPosts);
            //add filter for displaying current users posts.

            const imageDataPromises = querySnapshot.docs.map(async (doc) => {
              const imageMetadata = doc.data();
              //skip documents without a valid name
              if (!imageMetadata.imageName) {
                return null;
              }

              //image folder in storage:
              const imageUrl = await getDownloadURL(ref(FIREBASE_STORAGE, `PostedImages/${imageMetadata.imageName}`));
              return {
                id: doc.id,
                imageUrl,
                metadata: imageMetadata,
                comments: imageMetadata.comments || [],
                likes: imageMetadata.likes || [],
              };
            });
            console.log("Data has no errors")
            const imageData = (await Promise.all(imageDataPromises)).filter((data): data is IImageData => data !== null);
            setData(imageData);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
      console.log("Data is fetched")
    }
  }, [isFocused]);


  //DELETE POST
  const deleteOwnPost = async (id: string, imageName: string) => {
    Alert.alert(
      "Are you sure you want to delete the post?",
      "Note that the post will be deleted permanently from all databases, including comment history and map marker.",
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: async () => {
            try {
              //elete metadata from Firestore
              await deleteDoc(doc(collection(FIRESTORE_DATABASE, "PostedImages"), id));
              console.log("Metadata deleted from firestore: ", id);
              //elete image from storage
              await deleteObject(ref(FIREBASE_STORAGE, `PostedImages/${imageName}`));
              console.log("Image deleted from storage:", imageName);
              //refresh view
              setData(data)
              // fetchData();
            } catch (error) {
              console.error("Error deleting data:", error);
              // }
            };
          }
        },
      ]
    );
  };












  


  const { currentUser } = FIREBASE_AUTH; // Access user's UID from your authentication context
  const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [userImage, setUserImage] = useState(null);


  const pickImage = async () => {
    const result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        // setImageUri(result.uri);
    }
};
  














  const renderItem = ({ item }: { item: IImageData }) => (
    <EditGallery imgUri={{ uri: item.imageUrl }} deleteFunction={() => { deleteOwnPost(item.id, item.metadata.imageName) }} />
  )


  return (
    <View style={styles.profilePageContainer}>
      <View style={styles.userBanner}>
        <View style={styles.logOutBtn}>
          <DangerButton btnFunction={() => FIREBASE_AUTH.signOut()} text="LOG OUT" />
        </View>
        <Text style={styles.userHandleText}>{userAccount}</Text>
        <View style={{alignSelf: "flex-end"}}>
        <PostCounter numberOfPosts={data.length} />
        </View>
        {/* <Text>Hello, you have so far posted a total of {data.length} images to TravelSnap! Keep on travel'in!</Text> */}
      </View>
      <Text style={styles.postsHeader}>Administer your posts</Text>



      <TouchableOpacity onPress={pickImage}>
        <Text>Choose User Image</Text>
      </TouchableOpacity>




      
      <FlatList
        data={data}
        keyExtractor={(item) => item.imageUrl}
        renderItem={renderItem}
        horizontal={true}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  profilePageContainer: {
    flex: 1
  },
  userBanner: {
    flex: .4,
    minHeight: 300,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#2F4858",
    borderBottomColor: "#86BBD8",
    borderBottomWidth: 2
  },
  logOutBtn: {
    width: 100,
    alignSelf: "flex-end"
  },
  userHandleText: {
    color: "#F6AE2D",
    fontSize: 24,
    fontWeight: "bold"
  },
  userInfoText: {
    color: "#FFF"
  },
  userInfoContainer: {
    flexDirection: "row"
  },
  editableGalleryContainer: {
    flex: .6,
    backgroundColor: "#FFF"
  },
  postsHeader: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "600",
    paddingTop: 24
  },
})


export default UserProfileView

