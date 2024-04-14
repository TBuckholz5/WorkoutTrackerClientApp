import React from 'react'
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import { getExercisesForUser } from '../api/workout_api';
import { createExerciseListElementFromJSON } from '../components/ExerciseListElement';

export default function ExerciseList() {
  const [exercises, setExercises] = React.useState([]);

  React.useEffect(() => {
    getExercisesForUser().then((response) => {
      setExercises(response);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <Background>
      <Logo />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={exercises}
          renderItem={({item}) => createExerciseListElementFromJSON(item)}
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
