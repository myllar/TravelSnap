// import React, { useEffect, useState } from 'react';
// import { FIREBASE_STORAGE, FIRESTORE_DATABASE } from '../config/FirebaseConfig';
// import { getDownloadURL, ref } from 'firebase/storage';
// import { Image, View, FlatList, Text } from 'react-native';
// import { collection, getDocs } from 'firebase/firestore';
// import IImageData from '../Interfaces/IImageData'


// const GetAllPostedImages: React.FC = () => {

//   const [data, setData] = useState<IImageData[]>([]);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         //folder for text values in firestore db:
//         const querySnapshot = await getDocs(collection(FIRESTORE_DATABASE, "PostedImages"));

//         const imageDataPromises = querySnapshot.docs.map(async (doc) => {
//           const imageMetadata = doc.data();

//           //skip documents without a valid name
//           if (!imageMetadata.imageName) {
//             return null;
//           }

//           //image folder in storage:
//           const imageUrl = await getDownloadURL(ref(FIREBASE_STORAGE, `PostedImages/${imageMetadata.imageName}`));

//           return {
//             imageUrl,
//             metadata: imageMetadata,
//           };

//         });
//         console.log("Data is no error")
//         const imageData = (await Promise.all(imageDataPromises)).filter((data): data is IImageData => data !== null);
//         setData(imageData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//     console.log("Data is fetched")
//   }, []);


//   const renderItem = ({ item }: { item: IImageData }) => (
//     <View style={{ marginBottom: 20 }}>
//       <Text>User account: {item.metadata.userAccount}</Text>
//       <Text>Image title: {item.metadata.imageTitle}</Text>
//       <Image source={{ uri: item.imageUrl }} style={{ width: 200, height: 200 }} />
//       <Text>Location: {item.metadata.location}</Text>
//       <Text>Hashtag: {item.metadata.hashtag}</Text>
//       <Text>Description: {item.metadata.description}</Text>
//       <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>Description: {item.metadata.description}</Text>
//       <Text>Comments: {item.metadata.comments}</Text>
//     </View>
//   );


//   return (
//     <View>
//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.imageUrl}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };


// export default GetAllPostedImages;