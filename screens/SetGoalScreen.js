import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SetGoalScreen({ setDailyGoal }) {
  const [goal, setGoal] = useState('');

  const handleSaveGoal = async () => {
    if (!goal || isNaN(goal) || parseInt(goal) <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid goal.');
      return;
    }

    const numericGoal = parseInt(goal, 10);
    setDailyGoal(numericGoal);
    await AsyncStorage.setItem('dailyGoal', numericGoal.toString());
    Alert.alert('Goal Saved', `Your daily goal is now ${numericGoal} minutes.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Defina sua meta</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a meta em minutos"
        keyboardType="numeric"
        value={goal}
        onChangeText={setGoal}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveGoal}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#4A90E2', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#CCC', padding: 10, marginBottom: 20, borderRadius: 8 },
  button: { backgroundColor: '#4A90E2', padding: 15, borderRadius: 10 },
  buttonText: { color: '#FFF', textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
});
