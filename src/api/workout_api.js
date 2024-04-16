import axios from 'axios';
import { BASE_URL, JSON_HEADERS, getAuthHeader } from './constants';


export const getWorkouts = async () => {
    let header = await getAuthHeader();
    try {
        return (await axios.get(url = `${BASE_URL}/api/Workouts`, config = {
            headers: header,
        })).data;
    } catch (err) {
        throw err;
    }
}

export const getExercises = async () => {
    let header = await getAuthHeader();
    try {
        return (await axios.get(url = `${BASE_URL}/api/ExerciseTypes`, config = {
            headers: header,
        })).data;
    } catch (err) {
        throw err;
    }
}

export const createExercise = async (exercise_name) => {
    let header = await getAuthHeader();
    try {
        await axios.post(url = `${BASE_URL}/api/ExerciseTypes`, data = {
            'id': 0,
            'owner': 'owner',
            'name': exercise_name,
        }, config = {
            headers: { ...header, ...JSON_HEADERS, },
        });
    } catch (err) {
        throw err;
    }
}
