import React, {useState} from 'react';
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {client} from '../apis/common';
import useSWR, {useSWRConfig} from 'swr';
import {colors, sizes, spacing} from '../constants/theme';
import MainHeader from '../components/shared/MainHeader';
import {ListItem} from 'react-native-elements';
import Icon from '../components/shared/Icon';
import {Switch} from 'react-native-ios-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
import {Link} from '@react-navigation/native';
import { version, vlcPrefix } from "../data";
import InviteDialog from "../components/UserPage/InviteDialog";
import DownloadProgress from "../components/shared/downloadProgress";
import { downloadApk } from "../apis/downloadApk";

const UserScreen = () => {
  var RNFS = require('react-native-fs');
  const {mutate} = useSWRConfig();
  let {data: user} = useSWR(['auth/status', {throwHttpErrors: true}]);
  const clearCache = () => mutate(() => true, undefined, {revalidate: false});
  const [external, setExternal] = useState(false);
  const [fromFile, setFromFile] = useState(false);
  const [showDialog, setDialog] = useState(false);
  const [download, setDownload] = useState({visible: false, progress: 0})

  if (!fromFile) {
    console.log('read config from file');
    AsyncStorage.getItem('config').then(config => {
      config = JSON.parse(config);
      if (config && config.externalPlayback !== external) {
        setExternal(config.externalPlayback);
        // console.log('stateChange');
      }
    });
    setFromFile(true);
  }
  async function logout() {
    Alert.alert('', '確定登出？', [
      {
        text: '取消',
        style: 'cancel',
      },
      {
        text: '確定',
        onPress: () => {
          client.post('auth/signout').then(() => {
            clearCache();
          });
          AsyncStorage.clear();
        },
      },
    ]);
  }

  function checkAvail(value) {
    if (value) {
      Alert.alert(
        '注意：需要先安裝第三方軟體',
        '此功能需要先安裝安裝 mpv (Play Store) 以及 stream-url-handler (Github) 後才能正常運行，請先確定以安裝以上軟體後再開啟此開關，否則將無法播放',
        [
          {
            text: '尚未安裝，保持關閉',
            style: 'cancel',
            onPress: async () => {
              Alert.alert('', '是否下載 stream-url-handler？', [
                {
                  text: '否',
                  style: 'cancel',
                },
                {
                  text: '是',
                  onPress: async () => {
                    downloadApk(
                      'https://github.com/yzu1103309/stream-url-handler/releases/download/v1.0.0/stream-url-handler.apk',
                      RNFS.TemporaryDirectoryPath + '/stream-url-handler.apk',
                      setDownload,
                    );
                    setDownload({visible: true, progress: 0});
                  },
                },
              ]);
              Alert.alert('', '是否前往下載 mpv 播放器？', [
                {
                  text: '否',
                  style: 'cancel',
                },
                {
                  text: '是',
                  onPress: async () => {
                    await Linking.openURL('market://details?id=is.xyz.mpv');
                  },
                },
              ]);
            },
          },
          {
            text: '確定已安裝，開啟功能',
            onPress: () => {
              setExternal(value);
              // console.log('stateChange');
              AsyncStorage.mergeItem(
                'config',
                JSON.stringify({externalPlayback: value}),
              );
            },
          },
        ],
      );
    } else {
      setExternal(value);
      // console.log('stateChange');
      AsyncStorage.mergeItem(
        'config',
        JSON.stringify({externalPlayback: value}),
      );
    }
  }

  function showInfo()
  {
    const info = require('../../update-log.json');
    Alert.alert(`About ${version} Update`, info.text);
  }

  return (
    <View style={styles.container}>
      <InviteDialog visible={showDialog} setVisible={setDialog} />
      <DownloadProgress downloadState={download} />
      <MainHeader title="Home" />
      <View style={styles.topContainer}>
        <Text style={styles.title}>User Page</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.smallTitle}>User Options: </Text>
        <ListItem
          bottomDivider
          onPress={logout}
          containerStyle={styles.listItem}>
          <Icon
            icon={'Logout'}
            size={24}
            style={{
              tintColor: colors.primary,
              marginLeft: spacing.m,
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Logout</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        {Platform.OS === 'android' && (
          <>
            <Text style={[styles.smallTitle, {marginTop: spacing.l}]}>
              Playback settings:
            </Text>
            <ListItem bottomDivider containerStyle={styles.listItem}>
              <Icon
                icon={(external && 'External') || (!external && 'ExternalOff')}
                size={24}
                style={{
                  tintColor: colors.primary,
                  marginLeft: spacing.m,
                }}
              />
              <ListItem.Content>
                <ListItem.Title>External Playback</ListItem.Title>
              </ListItem.Content>
              <Switch
                value={external}
                onValueChange={val => {
                  checkAvail(val);
                }}
              />
            </ListItem>
          </>
        )}
        <Text style={[styles.smallTitle, {marginTop: spacing.l}]}>Info: </Text>
        <ListItem
          onPress={showInfo}
          bottomDivider
          containerStyle={styles.listItem}>
          <Icon
            icon={'Info'}
            size={24}
            style={{
              tintColor: colors.primary,
              marginLeft: spacing.m,
            }}
          />
          <ListItem.Content>
            <ListItem.Title>About This Update</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        {!!user.admin && (
          <>
            <Text style={[styles.smallTitle, {marginTop: spacing.l}]}>
              Admin Options:
            </Text>
            <ListItem
              bottomDivider
              containerStyle={styles.listItem}
              onPress={() => setDialog(true)}>
              <Icon
                icon={'Invite'}
                size={24}
                style={{
                  tintColor: colors.primary,
                  marginLeft: spacing.m,
                }}
              />
              <ListItem.Content>
                <ListItem.Title>Invite User</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    padding: spacing.l,
    paddingBottom: spacing.s,
  },
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  title: {
    fontSize: sizes.title,
    fontWeight: 'bold',
    marginBottom: spacing.m,
  },
  smallTitle: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    marginLeft: spacing.l,
    marginBottom: spacing.s,
  },
  listItem: {
    height: 55,
  },
});

export default UserScreen;
