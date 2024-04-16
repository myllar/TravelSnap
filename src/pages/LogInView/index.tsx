import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DATABASE } from '../../config/FirebaseConfig';
import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';




const Index = () => {
  // const [username, setUsername] = useState("Bob the builder")
  // const [email, setEmail] = useState("user1@user.no");
  // const [password, setPassword] = useState("123456");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showText, setShowText] = useState(false);

  const signInExistingUser = async () => {
    try {
      const user = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      console.log("signed in with user: ", email);
    } catch (error) {
      console.log("error signing in with user", email)
    }
  }

  const registerNewUser = async () => {
    try {
      const user = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      createUserInDatabase(user)
      console.log("User stored in db with email: ", email)
     
    } catch (error) {
      console.log("Unable to create user, ", error)
    }
    setShowText(true);
          setTimeout(() => {
        setShowText(true);
      }, 3000);
  }



  const createUserInDatabase = async (user: UserCredential) => {
    try {
      const docRef = await setDoc(doc(FIRESTORE_DATABASE, `users/${user.user.uid}`), {
        email: user.user.email
      },);


      

      // Hide the text after 3 seconds
      // setTimeout(() => {
      //   setShowText(false);
      // }, 3000);

    } catch (error) {
      console.log("Error storing user in firebase, ", error)
    }
  }


  return (
    <View style={styles.container}>

      {/* <TextInput value={username}
        placeholder="Username"
        style={styles.inputField}
        autoCapitalize='none'
        onChangeText={(Text) => setUsername(Text)}>
      </TextInput> */}



      <TextInput value={email}
        placeholder="email"
        style={styles.inputField}
        autoCapitalize='none'
        onChangeText={(Text) => setEmail(Text)}>
      </TextInput>

      <TextInput value={password}
        placeholder="Password"
        secureTextEntry={true}
        style={styles.inputField}
        autoCapitalize='none'
        onChangeText={(Text) => setPassword(Text)}>
      </TextInput>

      {/* <Button title='Login' onPress={signInExistingUser} /> */}
      <PrimaryButton text="Log in" btnFunction={signInExistingUser} />
      <SecondaryButton text="Create account" btnFunction={registerNewUser} />
      {/* <Button title='Create account' onPress={registerNewUser} /> */}

      {showText && (
        // <View>
        <Text>Unable to create an account. Fill in both email and password. If the issue remain, it may already be registered</Text>
        // </View>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 36,
    gap: 12,
    // height: "80%",
    flex: 1,
    justifyContent: "center"
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#86BBD8",
    height: 42,
    padding: 8,
    borderRadius: 21
  }
});

export default Index;
