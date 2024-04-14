import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WorkoutHistory from './WorkoutHistory';
import ExerciseList from './ExerciseList';
import Button from '../components/Button';
import { logout } from '../api/auth';


const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {

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

  function Settings() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings</Text>
        <Button
          mode="outlined"
          onPress={onLogoutPressed}
        >
          Logout
        </Button>
      </View>
    );
  }

  function StartWorkout() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>TODO create workout flow!</Text>
      </View>
    );
  }

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName="Start Workout"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
          name="Start Workout"
          component={StartWorkout}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={WorkoutHistory}
          options={{
            tabBarLabel: 'History',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="history" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Exercises"
          component={ExerciseList}
          options={{
            tabBarLabel: 'Exercises',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="human" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-cog" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
