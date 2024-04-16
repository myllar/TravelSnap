import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import UserProfileView from "../UserProfileView";
import LandingPageView from "../LandingPageView";
import UploadImageView from "../UploadImageView";



const Tab = createBottomTabNavigator();


const HomeRoutes: React.FC = () => {


    return (
        <Tab.Navigator
            initialRouteName="Start"
            //   sceneContainerStyle={{ backgroundColor: "red" }}
            screenOptions={{
                tabBarActiveTintColor: "#FFF",
                tabBarInactiveTintColor: "#86BBD8",

                // tabBarBackground: "#2F4858",
                tabBarLabelStyle: {
                    marginBottom: 5,

                },
                tabBarStyle: [
                    {
                        borderTopColor: "#86BBD8",
                        borderTopWidth: 1,
                        backgroundColor: "#2F4858",
                        padding: 12,
                        height: 70,
                    },
                ],
            }}
        >


            <Tab.Screen
                name="LandingPage"
                component={LandingPageView}
                options={{
                    title: "Home",
                    headerShown: true,
                    headerTintColor: "#F6AE2D",
                    headerStyle: {
                        backgroundColor: "#2F4858"
                    },
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons name="home" size={32} color="#86BBD8" />
                    ),
                }}
            />
            <Tab.Screen
                name="UploadImageView"
                component={UploadImageView}
                options={{
                    title: "New post",
                    headerShown: true,
                    headerTintColor: "#F6AE2D",
                    headerStyle: {
                        backgroundColor: "#2F4858"
                    },
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome name="camera" size={32} color="#86BBD8" />
                    ),
                }}
            />

            <Tab.Screen
                name="UserProfileView"
                component={UserProfileView}
                options={{
                    title: "Profile",
                    headerShown: true,
                    headerTintColor: "#F6AE2D",
                    headerStyle: {
                        backgroundColor: "#2F4858"
                    },
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons name="person" size={32} color="#86BBD8" />
                    ),
                }}
            /> 

        </Tab.Navigator>
    );
};

export default HomeRoutes;
