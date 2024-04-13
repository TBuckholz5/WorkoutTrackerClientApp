import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { Card } from 'react-native-elements';

export const createWorkoutListElementFromJSON = (data) => {
    return (
        <WorkoutListElement
            date={new Date(data.date).toString()}
            exercises={data.exercises}
        />
    );
}

const WorkoutListElement = props => {
    return <Card>
        <Card.Title>Workout on {props.date}</Card.Title>
        <Card.Divider />
        {
            props.exercises.map((exercise, i) => {
                return (
                    <View key={i}>
                        <Text>{exercise.name}</Text>
                        {
                            exercise.weights.map((weight, j) => {
                                return <Text key={j}>{weight}lbs for {exercise.reps[i]} reps</Text>
                            })
                        }
                    </View>
                );
            })
        }
    </Card>
}
