import React, { useState } from 'react'
import { Button, StyleSheet, Text, View, Image, TextInput, SafeAreaView, ActivityIndicator } from 'react-native';
import UserImage from '../../components/UserImage'
import { FIREBASE_AUTH, FIREBASE_STORAGE, FIRESTORE_DATABASE } from '../../config/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import * as Location from 'expo-location'
import SecondaryButton from '../../components/SecondaryButton';
import PrimaryButton from '../../components/PrimaryButton';
import { ICommentData } from '../../Interfaces/IImageData';




const UploadImageView = () => {


    const user = FIREBASE_AUTH.currentUser;
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [userAccount, setUserAccount] = useState(user?.email);
    const [imageTitle, setImageTitle] = useState("");
    const [hashtag, setHashtag] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [description, setDescription] = useState("");
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const [permission, requestPermission] = ImagePicker.useCameraPermissions();



    const pickImage = async () => {
        const result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.uri);
        }
    };

    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1
        });

        if (!result.canceled) {
            setImageUri(result.uri);
        }
    }



    const uploadToFirebase = async (
        uri: string | URL | Request,
        imageName: string,
        imageTitle: string,
        userAccount: string,
        latitude: number,
        longitude: number,
        hashtag: string,
        description: string,
        comments: ICommentData,
        user: string,
        onProgress: { (v: any): void; (arg0: string): any; }) => {
        const fetchResponse = await fetch(uri);
        const blobData = await fetchResponse.blob();

        //folder for text values in firestore db:
        const imageRef = ref(FIREBASE_STORAGE, `PostedImages/${imageName}`);
        const uploadTask = uploadBytesResumable(imageRef, blobData);

        return new Promise(async (resolve, reject) => {
            try {
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        onProgress && onProgress('Upload is ' + progress + '% done');
                        setIsLoading(true)
                    },
                    (error) => {
                        reject(error);
                    },
                    async () => {
                        //get download URL
                        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

                        //upload to firestore and link file to storage
                        const firestore = FIRESTORE_DATABASE;
                        //image folder in storage:
                        const imageCollectionRef = collection(firestore, 'PostedImages');
                        const imageDocRef = await addDoc(imageCollectionRef, {
                            imageUrl: downloadUrl,
                            imageName,
                            imageTitle,
                            userAccount,
                            latitude,
                            longitude,
                            hashtag,
                            description,
                            comments,
                            user,
                        });

                        //upload to storage and link file to firestore
                        resolve({
                            downloadUrl,
                            metadata: uploadTask.snapshot.metadata,
                            firestoreDocumentId: imageDocRef.id,
                        });
                        setIsLoading(false)
                    }
                );
                
            } catch (error) {
                reject(error);
            }

        });
    };


    const uploadToDatabase = async () => {
        if (imageUri && user) {
            try {
                const result = await uploadToFirebase(
                    imageUri,
                    //generate a random image name to avoid duplicates:
                    `${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
                    imageTitle,
                    userAccount,
                    latitude,
                    longitude,
                    hashtag,
                    description,
                    comments,
                    user.uid,
                    (progress) => {
                        console.log(progress);
                    }
                );
                console.log('Upload result:', result);
            } catch (error) {
                console.error('Error uploading to Firebase:', error);
            }
            setImageTitle("");
            setHashtag("");
            setDescription("");
            setImageUri("");
        }
    };


    const getDeviceCoordinates = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== "granted") {
            setLatitude(59.90249872890784)
            setLongitude(10.767766621130077)
            console.log("Permissions to get location denied, setting image loaction to Nissen")
            return
        }
        let location = await Location.getCurrentPositionAsync({})
        setLatitude(location.coords.latitude)
        setLongitude(location.coords.longitude)
    }

    getDeviceCoordinates()


    return (
        <SafeAreaView style={styles.container}>

            {/* <Text>{uploadTask.on}</Text> */}

            <Text style={styles.headerText}> CREATE NEW POST </Text>
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            <TextInput
                value={imageTitle}
                placeholder="Image title"
                style={styles.inputField}
                autoCapitalize='none'
                onChangeText={(Text) => setImageTitle(Text)}>
            </TextInput>

            <TextInput value={hashtag}
                placeholder="Hashtag"
                style={styles.inputField}
                autoCapitalize='none'
                onChangeText={(Text) => setHashtag(Text)}>
            </TextInput>

            <TextInput value={description}
                placeholder="Description"
                style={styles.inputField}
                autoCapitalize='none'
                onChangeText={(Text) => setDescription(Text)}>
            </TextInput>


            <>
                {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
                {/* <Button title="Pick Image" onPress={pickImage} />
                <Button title="Take photo" onPress={takePhoto} /> */}
                <SecondaryButton btnFunction={pickImage} text="Pick an image" />
                <SecondaryButton btnFunction={takePhoto} text="Take a photo" />
            </>


            {/* <Button title="Create Post" onPress={uploadToDatabase} /> */}
            <PrimaryButton btnFunction={uploadToDatabase} text="Create post" />


            {/* <Button title="Location" onPress={() => {console.log("lat ---> ", latitude, " -- lng ---> ", longitude)}} /> */}

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 24,
        justifyContent: "center",
        backgroundColor: "#FFF"
    },
    headerText: {
        alignSelf: "center",
        fontSize: 24,
        fontWeight: "600"
    },
    inputField: {
        backgroundColor: "#FFF",
        height: 42,
        padding: 8,
        alignItems: "center",
        borderRadius: 21,
        borderColor: "#86BBD8",
        borderWidth: 2
    }

})

export default UploadImageView