import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {colors} from '../../../constants/theme';
import {
  getFractionDigitsRating,
  getRatingLabel,
} from './utils';

const Rating = ({
  showLabelInline,
  showLabelTop,
  containerStyle,
  rating,
  disabled = true,
  size = 14,
}) => {
  return (
    <View
      style={[styles.container, containerStyle].concat(
        showLabelInline ? styles.containerRow : null,
      )}>
      {showLabelTop && (
        <Text style={styles.label}>
          {getRatingLabel(rating)} {getFractionDigitsRating(rating)}
        </Text>
      )}
      <AirbnbRating
        defaultRating={2.8}
        count={10}
        showRating={false}
        isDisabled={disabled}
        size={size}
      />
      {showLabelInline && (
        <Text style={styles.label}>{getFractionDigitsRating(rating)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
    marginHorizontal: -2,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    color: colors.primary,
    marginLeft: 4,
  },
});

export default Rating;
