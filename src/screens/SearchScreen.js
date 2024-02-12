import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors} from '../constants/theme';
import SearchInput from '../components/Search/SearchInput';
import Tabs from '../components/shared/Tabs';
import SearchMasonry from '../components/Search/SearchMasonry';
import {MOVIES, PLACES} from '../data';
import MainHeader from '../components/shared/MainHeader';
import useSWR from "swr";

const SearchScreen = () => {
  let {data: moviesList} = useSWR(['movies', {throwHttpErrors: true}]);
  let {data: tvList} = useSWR(['tvshows', {throwHttpErrors: true}]);
  let tabs = [
    {
      title: 'All',
      content: () => <SearchMasonry key="all" list={[...moviesList, ...tvList]} />,
    },
    {
      title: 'Movies',
      content: () => <SearchMasonry key="all" list={moviesList} />,
    },
    {
      title: 'TV Shows',
      content: () => <SearchMasonry key="places" list={tvList} />,
    },
  ];
  return (
    <View style={styles.container}>
      <MainHeader />
      <SearchInput />
      {!!moviesList && !!tvList && <Tabs items={tabs} />}
      {/*<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>*/}
      {/*  <Text>Search功能尚未開放</Text>*/}
      {/*</View>*/}
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
