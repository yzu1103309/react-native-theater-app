import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {colors, sizes, spacing} from '../constants/theme';
import MainHeader from '../components/shared/MainHeader';
import TopPlacesCarousel from '../components/Home/TopPlacesCarousel';
import {MOVIES, PLACES, TOP_PLACES} from '../data';
import SectionHeader from '../components/shared/SectionHeader';
import MediaList from '../components/Home/MediaList';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import useSWR from 'swr';

const HomeScreen = () => {
  const type = ['movies', 'tvshows'];
  const [selectedIndex, setSelected] = useState(0);
  let {data} = useSWR([type[selectedIndex], {throwHttpErrors: true}]);
  if (!!data)
  {
    data.sort((a, b) => {
      return parseInt(b.year) - parseInt(a.year);
    });
  }
  //console.log(data);
  return (
    <View style={styles.container}>
      <MainHeader title="Home" />
      <View style={styles.topContainer}>
        <Text style={styles.title}>Online Theater</Text>
        <SegmentedControl
          values={['Movies', 'TV Shows']}
          appearance={'light'}
          selectedIndex={selectedIndex}
          onChange={event => {
            setSelected(event.nativeEvent.selectedSegmentIndex);
          }}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionHeader title="Popular Now" />
        {!!data && <MediaList list={data} />}
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
});

export default HomeScreen;
