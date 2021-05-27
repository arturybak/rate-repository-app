import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-dom';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    margin: 10,
    paddingTop: 5
  }
});


const ItemSeparator = () => <View style={styles.separator} />;

const header = ({ sorting, setSorting, search, setSearch }) => {

  const onChangeSearch = query => setSearch(query);

  return (
    <View style={styles.header}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={search}
      />

      <Picker
        prompt={'Sort By'}
        selectedValue={sorting}
        onValueChange={(itemValue) =>
          setSorting(itemValue)
        }>
        <Picker.Item label="Latest" value="latest" />
        <Picker.Item label="Highest Rated" value="highest" />
        <Picker.Item label="Lowest Rated" value="lowest" />

      </Picker>

    </View>
  )
};

export const RepositoryListContainer = ({ repositories, onEndReach, history, sorting, setSorting, search, setSearch }) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories && repositories.edges
    ? repositories.edges.map(edge => edge.node)
    : [];

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => history.push(`/repo/${item.id}`)}>
        <RepositoryItem item={item} isDetailed={false} />
      </Pressable>
    )
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={header({ sorting, setSorting, search, setSearch })}
    />

  );
};

const RepositoryList = () => {
  const [sorting, setSorting] = useState('');
  const [search, setSearch] = useState('');
  const [debounced] = useDebounce(search, 500);
  const first = 8;
  const { repositories, loading, fetchMore } = useRepositories(sorting, debounced, first);

  const onEndReach = () => {
    fetchMore();
    //console.log('fetching more repos');
  };

  const history = useHistory();

  return <RepositoryListContainer repositories={repositories} onEndReach={onEndReach} search={search} setSearch={setSearch} sorting={sorting} setSorting={setSorting} history={history} />;
};


export default RepositoryList;
