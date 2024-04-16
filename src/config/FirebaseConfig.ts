import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getDatabase } from 'firebase/database';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  //PASTE YOUR FIREBASE CONFIG HERE:
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
  databaseURL: "",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DATABASE = getFirestore(FIREBASE_APP);
// export const FIREBASE_RT_DATABASE = getDatabase(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);











// // console.log(firebaseConfig)

// //delete:
// // const app = initializeApp(firebaseConfig);
// const db = getFirestore();

// const firebaseApp = getApp();
// const firebaseStorage = getStorage();


// const listFiles = async () => {
//   const storage = getStorage();

// // Create a reference under which you want to list
// const listRef = ref(storage, 'Images');

// // Find all the prefixes and items.
// const listResponse = await listAll(listRef);
// return listResponse.items
// };



// const uploadToFirebase = async (uri: string | URL | Request, name: string | undefined, onProgress: { (v: any): void; (arg0: string): any; }) => {
//   const fetchResponse = await fetch(uri);
//   const blobData = await fetchResponse.blob();
//   // console.log(blobData)

//   const imageRef = ref(getStorage(), `Images/${name}`);

//   const uploadTask = uploadBytesResumable(imageRef, blobData);

//   return new Promise((resolve, reject) => {
//     uploadTask.on('state_changed',
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         onProgress && onProgress('Upload is ' + progress + '% done');
//       },
//       (error) => {
//         reject(error);
//       },
//       async () => {
//         const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
//         resolve({
//           downloadUrl,
//           metadata: uploadTask.snapshot.metadata
//         })
//       }
//     );
//   })
// }


// export { db, firebaseApp, firebaseStorage, getApp, getApps, uploadToFirebase, listFiles, firebaseConfig };
