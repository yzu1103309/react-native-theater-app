import React from 'react';
import {View, StyleSheet} from 'react-native';
import {spacing} from '../../../constants/theme';

const CardContent = ({children, style}) => {
  return <View style={[styles.content, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    paddingHorizontal: spacing.m,
    justifyContent: 'center',
  },
});

export default CardContent;
