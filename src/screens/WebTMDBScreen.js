import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, shadow, sizes, spacing} from '../constants/theme';
import Icon from '../components/shared/Icon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import {WebView} from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';

const WebTMDBScreen = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  let {type, tmdb} = route.params;
  type = type === 'movies' ? 'movie' : 'tv';
  const [loading, setLoading] = useState({id: 0, l: false});
  function changeLoadingState(myId, l) {
    if (l) {
      setLoading({id: myId, l: l});
    } else if (loading.l && loading.id === myId) {
      setLoading({id: myId, l: l});
    }
  }
  return (
    <View style={styles.container}>
      <Spinner
        visible={loading.l}
        overlayColor={'rgba(255, 255, 255,0.8)'}
        color={colors.black}
        animation={'fade'}
      />
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
          onPress={navigation.goBack}
        />
      </Animatable.View>
      <WebView
        onLoadStart={() => changeLoadingState(1, true)}
        onLoadEnd={() => changeLoadingState(1, false)}
        style={{marginTop: insets.top + 45, marginBottom: insets.bottom}}
        source={{uri: `https://www.themoviedb.org/${type}/${tmdb}`}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#032541',
  },
  backButton: {
    position: 'absolute',
    left: spacing.l,
    zIndex: 1,
  },
  backIcon: {
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: sizes.radius,
    ...shadow.light,
  },
});

export default WebTMDBScreen;
