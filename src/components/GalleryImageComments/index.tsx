import { Image, Text, View, StyleSheet, Button, Alert, TouchableOpacity, } from 'react-native'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import React, { useState } from 'react';
import UserComment from '../UserComment';
import { FIREBASE_AUTH, FIREBASE_STORAGE, FIRESTORE_DATABASE } from '../../config/FirebaseConfig';
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { IImageData } from '../../Interfaces/IImageData';
import Avatar from '../Avatar';




const GalleryImageComments = (props) => {

  const [data, setData] = useState<IImageData[]>([]);
  const user = FIREBASE_AUTH.currentUser;
  const [commentText, setCommentText] = useState("");

  // GJØR ET FORSØK!
  const [comments, setComments] = useState(props.comments)

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
                  userId: user?.email,
                  text: commentText,
                  timestamp: new Date(),
                }]
                
              });
              setComments(
              (await getDoc(imageRef)).data()?.comments || []
              )
              
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


  return (
    <View style={styles.container} >
        <View>

                   {/* <TextInput
                placeholder="Add a comment..."
                value={commentText}
                onChangeText={(text) => setCommentText(text)}
              />
              <Button title="Add Comment" onPress={() => addCommentToPost(item.id)} />
            </View> */}


          <View style={styles.writeCommentContainer}>
            <Avatar user={user?.email} color={"#86BBD8"}/>
            <TextInput
              style={styles.inputTextField}
              placeholder='comment...'
              value={commentText}
              onChangeText={(text) => setCommentText(text)}
               />
           <TouchableOpacity onPress={() => addCommentToPost(props.id)} >
             <MaterialIcons name="subdirectory-arrow-left" size={32} color="#FFF" />
           </TouchableOpacity>
          </View>
          
            {comments.map((comment) => {
              return (<View key={comment.text} style={styles.commentsContainer}>
                <UserComment userHandle={comment.userId} commentText={comment.text} date={comment.timestamp} />
              </View>)
            })}

        </View>
      {/* })} */}
    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    // maxHeight: 500,
  },
  userHandleText: {
    fontSize: 18,
    fontWeight: "600"
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: "400"
  },

  writeCommentContainer: {
    backgroundColor: "#33658A",
    flexDirection: "row",
    // width: "100%",
    padding: 8,
    gap: 12,
    justifyContent: "space-between",
    alignItems: "center"
  },
  inputTextField: {
    width: "70%",
    height: 36,
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 8
  },

  commentsContainer: {
    backgroundColor: "#33658A",
    padding: 8,
    gap: 4,
    // width: "100%",
    justifyContent: "flex-start",
  },
  commentBanner: {
    padding: 8,
    // margin: 8,
    borderWidth: 1,
    borderColor: "#F6AE2D"
  }

});

export default GalleryImageComments
