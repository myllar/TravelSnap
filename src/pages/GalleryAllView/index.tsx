import React, { useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_STORAGE, FIRESTORE_DATABASE } from '../../config/FirebaseConfig';
import { deleteObject, getDownloadURL, ref } from 'firebase/storage';
import { Image, View, FlatList, Text, Button, TextInput, Alert, ScrollView } from 'react-native';
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import {IImageData} from '../../Interfaces/IImageData'




const GalleryAll: React.FC = () => {

  const [data, setData] = useState<IImageData[]>([]);
  const user = FIREBASE_AUTH.currentUser;
  const [commentText, setCommentText] = useState("");


  

  useEffect(() => {
    const fetchData = async () => {
      try {
        //folder for text values in firestore db:
        const querySnapshot = await getDocs(collection(FIRESTORE_DATABASE, "PostedImages"));
        if (user) {

          //add filter for displaying current users posts.
          // const filterOnOwPosts = query(collection(FIRESTORE_DATABASE, "PostedImages"), where("user", "==", user.uid));
          // const querySnapshot = await getDocs(filterOnOwPosts);
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
          console.log("Data is has no error")
          const imageData = (await Promise.all(imageDataPromises)).filter((data): data is IImageData => data !== null);
          setData(imageData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    console.log("Data is fetched")
  }, []);




  //DELETE POST
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




  //ADD COMMENTS
  //ADD COMMENTS
  const addCommentToPost = async (imageId: string) => {
    Alert.alert(
      "Are you sure you want post comment",
      "Note that the comment will be visible to all registrered users until the owner of the post, -or an administrator delete the post from TravelSnap.",
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: async () => {
            try {
              const imageRef = doc(FIRESTORE_DATABASE, "PostedImages", imageId);
              //initialize comments field:
              const existingComments = (await getDoc(imageRef)).data()?.comments || [];
              //add comment to comments array:
              await updateDoc(imageRef, {
                comments: [...existingComments, {
                  id: `${Date.now}_${Math.floor(Math.random() * 1000000)}`,
                  // userId: user.email,
                  text: commentText,
                  timestamp: new Date(),
                }],
              });
              //clear the comment text input
              setCommentText("");
            } catch (error) {
              console.error("Error adding comment:", error);
            }
          }
        },
      ]
    );
  };



  const renderItem = ({ item }: { item: IImageData }) => (
    <View style={{ marginBottom: 20 }}>
      {/* <Text>User account: {item.metadata.userAccount}</Text> */}
      {/* <Text>User account: {user?.email}</Text> */}
      <Text>Image title: {item.metadata.imageTitle}</Text>
      <Text>Uploaded by useraccount {item.metadata.userAccount}</Text>
      <Image source={{ uri: item.imageUrl }} style={{ width: 200, height: 200 }} />
      {/* <Text>Location: {item.metadata.location}</Text> */}
      <Text>Hashtag: {item.metadata.hashtag}</Text>
      <Text>Description: {item.metadata.description}</Text>
      <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "bold" }}>Description: {item.metadata.description}</Text>

      <Button title="Delete" onPress={() => deleteOwnPost(item.id, item.metadata.imageName)} />

      <Text>Comments:</Text>
      {Array.isArray(item.metadata.comments) && item.metadata.comments.length > 0 ? (
        item.metadata.comments.map((item) => (
          <View key={item.id}>
            <Text>User: {item.userId}</Text>
            <Text>item: {item.text}</Text>
            {/* <Text>Timestamp: {item.timestamp && item.timestamp.toString()}</Text> */}
          </View>
        ))
      ) : (
        <Text>This image has no commets yet...</Text>
      )}
      <TextInput
        placeholder="Add a comment..."
        value={commentText}
        onChangeText={(text) => setCommentText(text)}
      />
      <Button title="Add Comment" onPress={() => addCommentToPost(item.id)} />
    </View>
  );




  return (

    <View>
      {/* <ScrollView> */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.imageUrl}
          renderItem={renderItem}
        />
      {/* </ScrollView> */}
    </View>

  );
};


export default GalleryAll;
