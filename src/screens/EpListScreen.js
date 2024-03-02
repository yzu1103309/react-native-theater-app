import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  ScrollView, Linking,
} from 'react-native';
import {colors, shadow, sizes, spacing} from '../constants/theme';
import Icon from '../components/shared/Icon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import {WebView} from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import useSWR, {useSWRConfig} from 'swr';
import {Button} from 'react-native-ios-kit';
import {urlPrefix, vlcPrefix} from "../data";

const EPListScreen = ({navigation, route}) => {
  const id = route.params.id;
  let {data: eps} = useSWR(['tvshow/' + id + '/eps', {throwHttpErrors: true}]);
  console.log(!eps);
  async function openURL(fname, ext) {
    const url =
      vlcPrefix +
      urlPrefix +
      `tvshows/${id}/${fname + ext}&sub=${urlPrefix}tvshows/${id}/${fname}.srt`;
    const supported = await Linking.canOpenURL(url);
    console.log(url, supported);
    await Linking.openURL(url);
  }

  function playVid(fname, ext) {
    const source = urlPrefix + `tvshows/${id}/${fname + ext}`;
    const sub_source = `${urlPrefix}tvshows/${id}/${fname}.srt`;
    navigation.navigate('Video', {source, sub_source});
  }

  return (
    <View style={styles.container}>
      <Spinner
        visible={!eps}
        overlayColor={'rgba(255,255,255,0.8)'}
        color={colors.black}
        animation={'fade'}
      />
      <TouchableWithoutFeedback onPress={navigation.goBack}>
        <View style={{flex: 1}} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}>
        <View style={styles.backButton}>
          <Icon icon={'X'} size={25} onPress={navigation.goBack} />
        </View>
        <ScrollView style={styles.scroll} alwaysBounceVertical={false}>
          {eps &&
            eps.map((season, index) => {
              if (season.season !== 0) {
                return (
                  <View key={index}>
                    <Text style={styles.sTitle}>▶ 第 {season.season} 季</Text>
                    <View style={styles.btnGroup}>
                      {season.eps.map((ep, index2) => {
                        return (
                          <Button
                            key={index2}
                            rounded
                            inverted
                            style={styles.btn}
                            onPress={() => {
                              // openURL(ep.file, season.ext);
                              playVid(ep.file, season.ext);
                            }}
                            theme={{primaryColor: '#F39C12'}}>
                            {ep.name}
                          </Button>
                        );
                      })}
                    </View>
                  </View>
                );
              } else {
                return (
                  <View key={index}>
                    <Text style={styles.sTitle}>▶ 特別篇</Text>
                    <View style={styles.btnGroup2}>
                      {season.eps.map((ep, index2) => {
                        return (
                          <View key={index2}>
                            {ep.message !== '' && index2 === 0 && (
                              <Text style={styles.msg}>✦ {ep.message}</Text>
                            )}
                            {ep.message !== '' && index2 !== 0 && (
                              <Text style={[styles.msg, {marginTop: '5%'}]}>✦ {ep.message}</Text>
                            )}
                            <Button
                              rounded
                              inverted
                              style={styles.longBtn}
                              onPress={() => {
                                // openURL(ep.file, season.ext);
                                playVid(ep.file, season.ext);
                              }}
                              theme={{primaryColor: '#F39C12'}}>
                              {ep.name}
                            </Button>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                );
              }
            })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: '70%',
    backgroundColor: colors.light + 'e5',
    padding: spacing.m,
  },
  backButton: {
    zIndex: 1,
  },
  sTitle: {
    marginTop: spacing.l,
    marginLeft: spacing.s,
    fontSize: 16,
  },
  btnGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: spacing.s,
    marginLeft: spacing.m,
  },
  btnGroup2: {
    marginTop: spacing.s,
    marginLeft: spacing.m,
    marginRight: '6%',
  },
  btn: {
    alignSelf: 'flex-start',
    width: '28%',
    margin: '2%',
    shadowColor: colors.lightGray,
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
  },
  longBtn: {
    // alignSelf: 'flex-start',
    // width: '100%',
    marginLeft: '2%',
    marginVertical: '1.5%',
    shadowColor: colors.lightGray,
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
  },
  msg: {
    fontSize: 14,
    marginLeft: '2%',
  },
  scroll: {
    marginBottom: '10%',
  },
});

export default EPListScreen;
