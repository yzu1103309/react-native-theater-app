import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {sizes, spacing} from '../../../constants/theme';

const CardMedia = ({source, borderBottomRadius = false}) => {
  return (
    <View
      style={[styles.media].concat(
        borderBottomRadius ? styles.borderBottomRadius : null,
      )}>
      <Image style={styles.image} source={source} />
    </View>
  );
};

const styles = StyleSheet.create({
  media: {
    flex: 1,
    borderTopLeftRadius: sizes.radius,
    borderTopRightRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    height: '96%',
    width: '96%',
    margin: '2%',
    objectFit: 'cover',
    borderRadius: sizes.radius,
  },
  borderBottomRadius: {
    borderBottomLeftRadius: sizes.radius,
    borderBottomRightRadius: sizes.radius,
  },
});

export default CardMedia;
