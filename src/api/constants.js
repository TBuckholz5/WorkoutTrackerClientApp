import * as SecureStore from 'expo-secure-store';


export const BASE_URL = 'http://10.0.0.197:5001';

export const JSON_HEADERS = {
    'Content-Type': 'application/json',
    'accept': 'application/json',
};

export const getAuthHeader = async () => {
    let token = await SecureStore.getItemAsync('token');
    return {'Authorization': `Bearer ${token}`};
}