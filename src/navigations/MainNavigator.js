import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { Alert, Animated, Platform, StatusBar } from "react-native";
import useSWR from 'swr';
import LoginScreen from '../screens/LoginScreen';
import tabNavigator from './TabNavigator';
import MediaDetailsScreen from '../screens/MediaDetailsScreen';
import WebTMDBScreen from '../screens/WebTMDBScreen';
import WebIMDBScreen from '../screens/WebIMDBScreen';
import EPListScreen from '../screens/EpListScreen';
import VideoScreen from "../screens/VideoScreen";
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import { colors, sizes } from "../constants/theme";

const Stack = createStackNavigator();

const MyTransition = ({current, next, layouts}) => {
  return {
    cardStyle: {
      transform: [
        {
          translateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.height, 0],
          }),
        },
      ],
    },
    overlayStyle: {
      backgroundColor: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255,255,255,0)', 'rgba(150,150,150,0.6)'],
      }),
    },
  };
};

const MainNavigator = () => {
  let {data: user} = useSWR(['auth/status', {throwHttpErrors: true}]);
  let statusBarHidden = Platform.OS !== 'android';
  return (
    <NavigationContainer>
      <StatusBar
        hidden={statusBarHidden}
        backgroundColor={colors.light}
        barStyle={'light-content'}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={(!user && LoginScreen) || (!!user && tabNavigator)}
          options={{
            headerShown: false,
            useNativeDriver: true,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="MediaDetails"
          component={MediaDetailsScreen}
          options={{
            headerShown: false,
            useNativeDriver: true,
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="TMDB"
          component={WebTMDBScreen}
          options={{
            headerShown: false,
            useNativeDriver: true,
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="IMDB"
          component={WebIMDBScreen}
          options={{
            headerShown: false,
            useNativeDriver: true,
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="EPList"
          component={EPListScreen}
          options={{
            headerShown: false,
            presentation: 'modal',
            gestureEnabled: false,
            cardStyle: {backgroundColor: 'transparent'},
            detachPreviousScreen: false,
            cardOverlayEnabled: true,
            cardStyleInterpolator: MyTransition,
          }}
        />
        <Stack.Screen
          name="Video"
          component={VideoScreen}
          options={{
            headerShown: false,
            presentation: 'modal',
            gestureEnabled: false,
            cardStyle: {backgroundColor: 'transparent'},
            detachPreviousScreen: false,
            cardOverlayEnabled: true,
            cardStyleInterpolator: MyTransition,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
