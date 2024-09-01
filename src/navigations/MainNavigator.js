import React, {useState} from 'react';
import {Link, NavigationContainer} from '@react-navigation/native';
import {Alert, Animated, Linking, Platform, StatusBar} from 'react-native';
import useSWR from 'swr';
import LoginScreen from '../screens/LoginScreen';
import tabNavigator from './TabNavigator';
import MediaDetailsScreen from '../screens/MediaDetailsScreen';
import WebTMDBScreen from '../screens/WebTMDBScreen';
import WebIMDBScreen from '../screens/WebIMDBScreen';
import EPListScreen from '../screens/EpListScreen';
import VideoScreen from '../screens/VideoScreen';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import {colors, sizes} from '../constants/theme';
import {version} from '../data';
import { downloadApk } from "../apis/downloadApk";
import RNFS from "react-native-fs";
import DownloadProgress from "../components/shared/downloadProgress";

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
  let {data: latest} = useSWR(['app/latest-version', {throwHttpErrors: false}]);
  let [updateShown, setShown] = useState(false);
  const [download, setDownload] = useState({visible: false, progress: 0});
  let statusBarHidden = Platform.OS !== 'android';

  if (
    !!latest &&
    Platform.OS === 'android' &&
    !updateShown &&
    version !== latest.version
  ) {
    Alert.alert('New Update Available', 'New version detected. Download now?', [
      {
        text: 'Not now',
        style: 'cancel',
      },
      {
        text: 'Sure',
        onPress: () => {
          downloadApk(
            latest.url,
            RNFS.TemporaryDirectoryPath + '/Theater-latest.apk',
            setDownload,
          );
          setDownload({visible: true, progress: 0});
        },
      },
    ]);
    setShown(true);
  }

  return (
    <NavigationContainer>
      <StatusBar
        hidden={statusBarHidden}
        backgroundColor={colors.light}
        barStyle={'light-content'}
      />
      <DownloadProgress downloadState={download}></DownloadProgress>
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
