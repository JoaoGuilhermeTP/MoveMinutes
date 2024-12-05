import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ExerciseCard({ exercise, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{exercise.name}</Text>
      <Text style={styles.duration}>{exercise.duration} mins</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteText}>Exclur</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, marginVertical: 10, backgroundColor: '#FFF', borderRadius: 8, elevation: 3 },
  name: { fontSize: 18, fontWeight: 'bold' },
  duration: { fontSize: 16, color: '#666', marginBottom: 10 },
  deleteButton: { backgroundColor: '#E74C3C', padding: 10, borderRadius: 5 },
  deleteText: { color: '#FFF', textAlign: 'center', fontSize: 14 },
});
