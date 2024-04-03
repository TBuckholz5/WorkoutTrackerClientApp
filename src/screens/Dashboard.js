import React from 'react'
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Button from '../components/Button'
import { logout } from '../api/auth'
import { getWorkoutsForUser } from '../api/workout_api';
import { createWorkoutListElementFromJSON } from '../components/WorkoutListElement';

export default function Dashboard({ navigation }) {
  const [workouts, setWorkouts] = React.useState([]);

  React.useEffect(() => {
    getWorkoutsForUser().then((response) => {
      setWorkouts(response);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const onLogoutPressed = async () => {
    logout().then((_) => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'StartScreen' }],
      })
    }).catch((err) => {
      console.log(err);
    });
  }

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
      <Button
        mode="outlined"
        onPress={onLogoutPressed}
      >
        Logout
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
