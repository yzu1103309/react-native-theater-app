import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Touchable,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {colors} from '../constants/theme';
import SearchInput from '../components/Search/SearchInput';
import Tabs from '../components/shared/Tabs';
import SearchMasonry from '../components/Search/SearchMasonry';
import {MOVIES, PLACES} from '../data';
import MainHeader from '../components/shared/MainHeader';
import useSWR from 'swr';

const SearchScreen = () => {
  let {data: moviesList} = useSWR(['movies', {throwHttpErrors: true}]);
  let {data: tvList} = useSWR(['tvshows', {throwHttpErrors: true}]);
  const [search, setSearch] = useState('');
  let tabs = [
    {
      title: 'All',
      content: () => (
        <SearchMasonry
          key="all"
          list={[...moviesList, ...tvList]}
          keywords={search}
          setKeywords={setSearch}
        />
      ),
    },
    {
      title: 'Movies',
      content: () => (
        <SearchMasonry
          key="movies"
          list={moviesList}
          keywords={search}
          setKeywords={setSearch}
        />
      ),
    },
    {
      title: 'TV Shows',
      content: () => (
        <SearchMasonry
          key="tvshows"
          list={tvList}
          keywords={search}
          setKeywords={setSearch}
        />
      ),
    },
  ];
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <MainHeader />
          <SearchInput search={search} setSearch={setSearch} />
          {!!moviesList && !!tvList && <Tabs items={tabs} />}
          {/*<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>*/}
          {/*  <Text>Search功能尚未開放</Text>*/}
          {/*</View>*/}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});

export default SearchScreen;
