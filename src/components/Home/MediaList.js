import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors, sizes, spacing} from '../../constants/theme';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import Card from '../shared/Card/Card';
import CardMedia from '../shared/Card/CardMedia';
import CardContent from '../shared/Card/CardContent';
import {urlPrefix} from '../../data';

const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2);
const CARD_HEIGHT = CARD_WIDTH * 1.9;

const MediaList = ({list}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {list.map((item, index) => {
        if (!item.thumb) {
          item.thumb = urlPrefix + item.type + '/' + item.id + '/poster.jpg';
        }
        if (!item.fanart) {
          item.fanart = urlPrefix + item.type + '/' + item.id + '/fanart.jpg';
        }
        return (
          <Card
            key={item.id}
            style={styles.card}
            onPress={() => {
              navigation.navigate('MediaDetails', {item: item});
            }}>
            <SharedElement id={`item.${index}.image`} style={styles.media}>
              <CardMedia source={{uri: item.thumb}} borderBottomRadius />
            </SharedElement>
            <CardContent style={{height: '20%'}}>
              <View>
                <Text numberOfLines={2} style={styles.title}>
                  {item.title}
                </Text>
                <Text style={styles.location}>{item.year}</Text>
              </View>
            </CardContent>
          </Card>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardContainer: {
    marginLeft: spacing.l,
    marginBottom: spacing.l,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginLeft: spacing.l,
    marginBottom: spacing.l,
  },
  media: {
    height: '78%',
  },
  title: {
    fontSize: sizes.body,
    color: colors.primary,
    marginBottom: 5,
  },
  location: {
    fontSize: sizes.body,
    color: colors.lightGray,
  },
});

export default MediaList;
