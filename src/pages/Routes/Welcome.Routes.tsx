import React, {  } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeRoutes from ".";


const { Navigator, Screen } = createStackNavigator();

const WelcomeRoutes: React.FC = () => {

  return (
    <NavigationContainer independent={true}>
      <Navigator>
      <Screen
        name="HomeRoutes"
        component={HomeRoutes}
        options={{
          headerShown: false,
        }}
      />
      </Navigator>
    </NavigationContainer>
  );
};

export default WelcomeRoutes;
