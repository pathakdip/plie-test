import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { toggleFavorite } from '../store/favoritesSlice';
import { getEventsList } from '../api/eventsApi';
import ItemCard from '../components/ItemCard';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const favItems = useAppSelector(state => state.favorites.favItems);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await getEventsList();
      setEvents(res.data.events); // ensure API returns {events:[]}
    } catch (err) {
      console.log('Error fetching events:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const renderItem = ({ item }) => {
    const isFavorite = favItems.some(f => f.id === item.id);

    return (
      <ItemCard
        item={item}
        isFavorite={isFavorite}
        onToggleFavorite={() => dispatch(toggleFavorite(item))}
      />
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Hello Renzo!</Text>
      <Text style={styles.subText}>Are you ready to dance?</Text>

      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F6F6F6',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 20,
  },
});
