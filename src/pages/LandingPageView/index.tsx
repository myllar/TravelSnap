import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { FIREBASE_AUTH, FIREBASE_STORAGE, FIRESTORE_DATABASE } from '../../config/FirebaseConfig';
import { getDownloadURL, ref } from 'firebase/storage';
import { View, FlatList } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { IImageData } from '../../Interfaces/IImageData'
import GalleryImage from '../../components/GalleryImage';
import SplashAnimation from '../../components/SplashAnimation';


const LandingPageView: React.FC = () => {

  const isFocused = useIsFocused();
  const [data, setData] = useState<IImageData[]>([]);
  const user = FIREBASE_AUTH.currentUser;
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  const [ticketColor, setTicketColor] = useState("#2F4858")
  const [showMapModal, setShowMapModal] = useState(false)


  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(FIRESTORE_DATABASE, "PostedImages"));
          if (user) {
            const imageDataPromises = querySnapshot.docs.map(async (doc) => {
              const imageMetadata = doc.data();

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
            console.log("fetched", (imageDataPromises.length), "posts")
            const imageData = (await Promise.all(imageDataPromises)).filter((data): data is IImageData => data !== null);
            setData(imageData);
            setIsLoading(false)
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [isFocused]);


  const renderItem = ({ item }: { item: IImageData }) => (
    <View>
      <GalleryImage
        imageUri={{ uri: item.imageUrl }}
        latitude={item.metadata.latitude}
        longitude={item.metadata.longitude}
        comments={item.metadata.comments}
        ownerUserHandle={item.metadata.userAccount}
        imageDescription={item.metadata.description}
        id={item.id}
      />
    </View>
  );


  return (
    <View >
      {isLoading ? <SplashAnimation /> :
        <FlatList
          data={data}
          keyExtractor={(item) => item.imageUrl}
          renderItem={renderItem}
        />
      }
    </View>
  );
};


export default LandingPageView;