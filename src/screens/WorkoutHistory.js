import React from 'react'
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Background from '../components/Background'
import Logo from '../components/Logo'
import { getWorkoutsForUser } from '../api/workout_api';
import { createWorkoutListElementFromJSON } from '../components/WorkoutListElement';

export default function WorkoutHistory() {
  const [workouts, setWorkouts] = React.useState([]);

  React.useEffect(() => {
    getWorkoutsForUser().then((response) => {
      setWorkouts(response);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <Background>
      <Logo />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={workouts}
          renderItem={({item}) => createWorkoutListElementFromJSON(item)}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
