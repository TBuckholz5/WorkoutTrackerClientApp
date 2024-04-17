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

export const createExercise = async (name) => {
    let header = await getAuthHeader();
    try {
        return (await axios.post(url = `${BASE_URL}/api/ExerciseTypes`, data = {
            'name': name,
        }, config = {
            headers: { ...header, ...JSON_HEADERS, },
        })).data;
    } catch (err) {
        throw err;
    }
}

export const deleteExercise = async (id) => {
    let header = await getAuthHeader();
    try {
        return (await axios.delete(url = `${BASE_URL}/api/ExerciseTypes/${id}`, config = {
            headers: header,
        })).data;
    } catch (err) {
        throw err;
    }
}
