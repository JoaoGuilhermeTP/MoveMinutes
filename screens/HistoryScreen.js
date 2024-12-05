import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const keys = await AsyncStorage.getAllKeys();
      const historyData = await AsyncStorage.multiGet(keys);

      const formattedData = historyData
        .map(([date, exercises]) => {
          try {
            const parsedExercises = JSON.parse(exercises) || [];
            const totalMinutes = parsedExercises.reduce(
              (sum, exercise) => sum + parseInt(exercise.duration || 0),
              0
            );
            return { date, totalMinutes };
          } catch {
            return { date, totalMinutes: 0 }; // Handle malformed data
          }
        })
        .filter((item) => item.date !== 'dailyGoal'); // Exclude the 'dailyGoal' key

      setHistory(formattedData);
    };
    loadHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico</Text>
      {history.length === 0 ? (
        <Text style={styles.noHistory}>No history available yet.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View style={styles.historyCard}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.totalMinutes}>
                Total: {item.totalMinutes} minutos
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 20,
  },
  noHistory: { fontSize: 16, color: '#999', textAlign: 'center', marginTop: 20 },
  historyCard: {
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 3,
  },
  date: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  totalMinutes: { fontSize: 16, color: '#666' },
});
