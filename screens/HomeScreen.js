import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExerciseCard from '../components/ExerciseCard';
import ProgressBar from '../components/ProgressBar';
import HistoryScreen from './HistoryScreen';
import SetGoalScreen from './SetGoalScreen';

const HomeTab = ({ exercises, setExercises, totalDuration, dailyGoal, navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Move Minutes</Text>
    <ProgressBar progress={totalDuration} goal={dailyGoal} />
    <Text style={styles.goalText}>Meta de hoje: {dailyGoal} minutos</Text>
    <FlatList
      data={exercises}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <ExerciseCard
          exercise={item}
          onDelete={() => {
            const updatedExercises = exercises.filter((_, i) => i !== index);
            setExercises(updatedExercises);
          }}
        />
      )}
    />
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Add Exercise', { exercises, setExercises })}
    >
      <Text style={styles.buttonText}>Adicionar atividade</Text>
    </TouchableOpacity>
  </View>
);

export default function HomeScreen({ navigation }) {
  const [exercises, setExercises] = useState([]);
  const [dailyGoal, setDailyGoal] = useState(60);
  const [totalDuration, setTotalDuration] = useState(0);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home' },
    { key: 'history', title: 'Histórico' },
    { key: 'setGoal', title: 'Meta' },
  ]);

  useEffect(() => {
    const loadData = async () => {
      const today = new Date().toISOString().split('T')[0];
      const savedExercises = await AsyncStorage.getItem(today);
      const savedGoal = await AsyncStorage.getItem('dailyGoal');
      if (savedExercises) setExercises(JSON.parse(savedExercises));
      if (savedGoal) setDailyGoal(parseInt(savedGoal, 10));
    };
    loadData();
  }, []);

  useEffect(() => {
    const calculateTotalDuration = () => {
      const total = exercises.reduce((sum, exercise) => sum + parseInt(exercise.duration || 0), 0);
      setTotalDuration(total);
    };
    calculateTotalDuration();

    const saveData = async () => {
      const today = new Date().toISOString().split('T')[0];
      await AsyncStorage.setItem(today, JSON.stringify(exercises));
    };
    saveData();
  }, [exercises]);

  const renderScene = SceneMap({
    home: () => (
      <HomeTab
        exercises={exercises}
        setExercises={setExercises}
        totalDuration={totalDuration}
        dailyGoal={dailyGoal}
        navigation={navigation}
      />
    ),
    history: () => <HistoryScreen />,
    setGoal: () => <SetGoalScreen setDailyGoal={setDailyGoal} />,
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#4A90E2" barStyle="light-content" />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={styles.tabBar}
            labelStyle={styles.tabLabel}
            indicatorStyle={styles.tabIndicator}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F5F5' },
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#4A90E2', textAlign: 'center', marginBottom: 20 },
  goalText: { fontSize: 18, textAlign: 'center', color: '#333', marginBottom: 10 },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    width: '60%',
  },
  buttonText: { color: '#FFF', textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
  tabBar: { backgroundColor: '#4A90E2' },
  tabLabel: { color: '#FFF', fontSize: 16 },
  tabIndicator: { backgroundColor: '#FFF', height: 3 },
});