// Optimized component using memoization and virtualization
import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const Item = React.memo(({ item }) => (
  <View style={styles.item}>
    <Text>{item.key}</Text>
  </View>
));

const MyFlatList = ({ data }) => {
  const renderItem = useCallback(({ item }) => (
    <Item item={item} />
  ), []);

  const keyExtractor = useMemo(() => (item) => item.key, []);

  // Virtualization: render only visible items
  const getItemLayout = useMemo(() => (data, index) => (
    {
      length: 50, // Approx height of each item
      offset: 50 * index,
      index
    }
  ), []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout} />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 50 //Approximate height
  },
});

export default MyFlatList;