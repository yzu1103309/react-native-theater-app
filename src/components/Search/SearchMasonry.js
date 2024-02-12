import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import {sizes, spacing} from '../../constants/theme';
import SearchCard from './SearchCard';
import useSWR from 'swr';

const SearchMasonry = ({list, keywords, setKeywords}) => {
  const [refresh, setRefresh] = useState(0);
  list.sort(() => Math.random() - 0.5);
  let filtered = list.filter(obj => {
    return obj.title.toLowerCase().indexOf(keywords.toLowerCase()) !== -1;
  });
  if (filtered.length > 10) {
    filtered = filtered.slice(0, 10);
  }
  return (
    <View style={{flex: 1}}>
      {!!filtered.length && (
        <MasonryList
          data={filtered}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.masonry}
          showsVerticalScrollIndicator={false}
          renderItem={({item, i}) => <SearchCard item={item} index={i} />}
          refreshing={false}
          onRefresh={() => setRefresh(refresh + 1)}
        />
      )}
      {!filtered.length && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 16}}>查無任何結果</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  masonry: {
    paddingHorizontal: spacing.l,
  },
});

export default SearchMasonry;
