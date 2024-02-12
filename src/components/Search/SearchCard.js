import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Card from '../shared/Card/Card';
import CardMedia from '../shared/Card/CardMedia';
import CardContent from '../shared/Card/CardContent';
import {spacing, sizes, colors} from '../../constants/theme';
import CardFavoriteIcon from '../shared/Card/CardFavoriteIcon';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import {urlPrefix} from '../../data';

const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2);
const CARD_HEIGHT = CARD_WIDTH * 1.85;

const SearchCard = ({item, index}) => {
  if (!item.thumb) {
    item.thumb = urlPrefix + item.type + '/' + item.id + '/poster.jpg';
  }
  if (!item.fanart) {
    item.fanart = urlPrefix + item.type + '/' + item.id + '/fanart.jpg';
  }
  const navigation = useNavigation();
  const even = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index < 6 ? index * 80 : 0)}
      style={{
        paddingTop: index === 1 ? spacing.l : 0,
        paddingLeft: !even ? spacing.l / 2 : 0,
        paddingRight: even ? spacing.l / 2 : 0,
        paddingBottom: spacing.l,
      }}>
      <Card
        onPress={() => {
          navigation.navigate('MediaDetails', {item: item});
        }}
        style={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {/*<CardFavoriteIcon onPress={() => {}} />*/}
        <SharedElement id={`trip.${item.id}.image`} style={styles.media}>
          <CardMedia source={{uri: item.thumb}} borderBottomRadius />
        </SharedElement>
        <CardContent style={{height: '20%'}}>
          <View>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.location}>{item.year}</Text>
          </View>
        </CardContent>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  media: {
    height: '78%',
  },
  title: {
    fontSize: sizes.body,
    fontWeight: 'bold',
    color: colors.primary,
    marginVertical: 4,
  },
  location: {
    fontSize: sizes.body,
    color: colors.lightGray,
  },
});

export default SearchCard;
