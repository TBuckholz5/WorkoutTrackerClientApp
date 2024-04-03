import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { BASE_URL, JSON_HEADERS, getAuthHeader } from './constants';


const storeTokensFromResponseData = async (data) => {
    console.log(`Token: ${data.accessToken}`)
    console.log(`Refresh Token: ${data.refreshToken}`)
    await SecureStore.setItemAsync('token', data.accessToken);
    await SecureStore.setItemAsync('refresh_token', data.refreshToken);
}

export const login = async (email, password) => {
    try {
        let response = await axios.post(url = `${BASE_URL}/login`, data = {
            'email': email,
            'password': password,
            'twoFactorCode': '',
            'twoFactorRecoveryCode': '',
        }, config = {
            params: {
                useCookies: false,
                useSessionCookies: false,
            },
            headers: JSON_HEADERS,
        });
        storeTokensFromResponseData(response.data);
    } catch (err) {
        throw err;
    }
}

export const logout = async () => {
    let header = await getAuthHeader();
    try {
        await axios.post(url = `${BASE_URL}/logout`, data = {
        }, config = {
            headers: { ...header, 'withCredentials': true },
        });
    } catch (err) {
        throw err;
    }
}

export const register = async (email, password) => {
    try {
        let response = await axios.post(url = `${BASE_URL}/register`, data = {
            'email': email,
            'password': password,
        }, config = {
            headers: JSON_HEADERS,
        });
        console.log(response);
    } catch (err) {
        throw err;
    }
}
