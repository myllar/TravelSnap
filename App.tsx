
import { SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import WelcomeRoutes from './src/pages/Routes/Welcome.Routes';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './src/config/FirebaseConfig';
import LogInVIew from './src/pages/LogInVIew';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './src/context/AuthenticationContext';

const { Navigator, Screen } = createStackNavigator();
const Stack = createStackNavigator()


export default function App() {
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    AuthProvider
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user ", user);
      setUser(user);
      console.log(user?.uid)
      console.log(user?.email)
      console.log(user)
    });
  }, []);

  return (
    <AuthProvider>
      <View style={{ backgroundColor: "#2F4858", flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer independent={true}>
            <Navigator initialRouteName="login">

              {user ? (

                <Screen
                  name="WelcomeRoutes"
                  component={WelcomeRoutes}
                  // component={ViewWelcomePage}
                  options={{
                    headerShown: false,
                  }}
                />

              ) : (

                <Screen
                  name="LogInVIew"
                  component={LogInVIew}
                  options={{
                    headerShown: false,
                  }}
                />
              )}
            </Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
