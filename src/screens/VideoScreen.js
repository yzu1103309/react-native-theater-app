import React, { useEffect, useState } from "react";
import {View, StyleSheet, BackHandler} from 'react-native';
import Video, {TextTrackType} from 'react-native-video';
import { colors, shadow, sizes, spacing } from "../constants/theme";
import Icon from '../components/shared/Icon';
import * as Animatable from 'react-native-animatable';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ScreenOrientation from 'expo-screen-orientation';
import Subtitles from 'react-native-subtitles';

const VideoScreen = ({navigation, route}) => {
  useEffect(() => {
    function handleBackButtonClick() {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT,
      ).then(navigation.goBack());
      return true;
    }
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [navigation]);
  let {source, sub_source} = route.params;
  const insets = useSafeAreaInsets();
  const [time, setTime] = useState(0);
  return (
    <View style={{flex: 1, backgroundColor: colors.black}}>
      <Animatable.View
        style={[styles.backButton, {marginTop: insets.top}]}
        animation={'fadeIn'}
        delay={200}
        duration={300}
        easing="ease-in-out">
        <Icon
          icon="Back"
          viewStyle={styles.backIcon}
          size={28}
          onPress={()=> {
            ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.PORTRAIT,
            ).then(navigation.goBack());
          }}
        />
      </Animatable.View>
      <Video
        onLoad={()=> ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)}
        fullscreen={true}
        onEnd={()=> {
          ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT,
          ).then(navigation.goBack());
        }}
        source={{
          uri: source,
        }} // Can be a URL or a local file.
        style={styles.backgroundVideo}
        controls={true}
        resizeMode={'contain'}
        // textTracks={[
        //   {
        //     title: 'CC',
        //     language: 'zh',
        //     type: TextTrackType.SRT,
        //     uri: sub_source,
        //   },
        // ]}
        // selectedTextTrack={{
        //   type: 'title',
        //   value: 'CC',
        // }}
        onProgress={res => {
          setTime(res.currentTime);
        }}
        progressUpdateInterval={100}
      />
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Subtitles
          selectedsubtitle={{file: sub_source}}
          currentTime={time}
          textStyle={{
            fontSize: 26,
            fontWeight: 'bold',
            textShadowColor: '#000',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 8,
          }}
        />
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backIcon: {
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: sizes.radius,
    ...shadow.light,
  },
  backButton: {
    position: 'absolute',
    left: spacing.l,
    zIndex: 1,
  },
});

export default VideoScreen;
