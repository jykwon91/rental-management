import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { usePostsQuery, withApollo } from '@rental-mgmt/controllers';

const App = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null as null | string,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lireddit App hello</Text>
      <FlatList
        data={data?.posts.posts}
        renderItem={({ item }: any) => (
          <View>
            <Text style={styles.item}>Title: {item.title}</Text>
            <Text style={styles.item}>Text Snippet: {item.textSnippet}</Text>
            <Text style={styles.item}>Author: {item.creator.username}</Text>
            <Text></Text>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  header: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default withApollo({ ssr: true })(App);
