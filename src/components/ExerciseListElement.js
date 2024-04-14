import React from 'react';
import { Card } from 'react-native-elements';

export const createExerciseListElementFromJSON = (data) => {
    return (
        <ExerciseListElement
            name={data.name}
        />
    );
}

const ExerciseListElement = props => {
    return <Card>
        <Card.Title>{props.name}</Card.Title>
    </Card>
}
