import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors} from '../constants/theme';
import SearchInput from '../components/Search/SearchInput';
import Tabs from '../components/shared/Tabs';
import SearchMasonry from '../components/Search/SearchMasonry';
import {MOVIES, PLACES} from '../data';
import MainHeader from '../components/shared/MainHeader';

const tabs = [
  {
    title: 'All',
    content: () => <SearchMasonry key="all" list={[...MOVIES, ...PLACES]} />,
  },
  {
    title: 'Movies',
    content: () => <SearchMasonry key="all" list={MOVIES} />,
  },
  {
    title: 'TV Shows',
    content: () => <SearchMasonry key="places" list={PLACES} />,
  },
];

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <MainHeader />
      <SearchInput />
      {/*<Tabs items={tabs} />*/}
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Search功能尚未開放</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});

export default SearchScreen;
