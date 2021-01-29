import BookDonateScreen from "../screens/BookDonateScreen"
import BookRequestScreen from "../screens/BookRequestScreen"
import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react'
import {Image} from 'react-native';

export const AppTabNavigator = createBottomTabNavigator({
    DonateBooks:{screen:BookDonateScreen,
        navigationOptions:{
            tabBarIcon:<Image style={{width:20,height:20}} source={require("../assets/adaptive-icon.png")}/>,
            tabBarLabel:"Donate Books"
        }
    },
    RequestBooks:{screen:BookRequestScreen,
        navigationOptions:{
            tabBarIcon:<Image style={{width:20,height:20}} source={require("../assets/favicon.png")}/>,
            tabBarLabel:"Request Books"
        }
    }
})