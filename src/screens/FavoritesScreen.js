import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useAppSelector } from '../store';
import ItemCard from '../components/ItemCard';

export default function FavoritesScreen() {
  const favItems = useAppSelector(state => state.favorites.favItems);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 15 }}>
        Favorites
      </Text>

      <FlatList
        data={favItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ItemCard item={item} isFavorite={true} onToggleFavorite={() => {}} />
        )}
      />
    </View>
  );
}
