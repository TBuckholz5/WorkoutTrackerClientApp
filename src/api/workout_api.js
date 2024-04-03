import axios from 'axios';
import { BASE_URL, getAuthHeader } from './constants';


export const getWorkoutsForUser = async () => {
    let header = await getAuthHeader();
    try {
        return (await axios.get(url = `${BASE_URL}/api/Workouts`, config = {
            headers: header,
        })).data;
    } catch (err) {
        throw err;
    }
}
