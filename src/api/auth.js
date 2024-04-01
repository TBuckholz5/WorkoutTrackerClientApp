import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const baseUrl = 'http://10.0.0.197:5001';

const jsonHeaders = {
    'Content-Type': 'application/json',
    'accept': 'application/json',
};


const storeTokensFromResponseData = async (data) => {
    console.log(`Token: ${data.accessToken}`)
    console.log(`Refresh Token: ${data.refreshToken}`)
    await SecureStore.setItemAsync('token', data.accessToken);
    await SecureStore.setItemAsync('refresh_token', data.refreshToken);
}

export const login = async (email, password) => {
    try {
        let response = await axios.post(url = `${baseUrl}/login`, data = {
            'email': email,
            'password': password,
            'twoFactorCode': '',
            'twoFactorRecoveryCode': '',
        }, config = {
            params: {
                useCookies: false,
                useSessionCookies: false,
            },
            headers: jsonHeaders,
        });
        storeTokensFromResponseData(response.data);
    } catch (err) {
        throw err;
    }
}

export const logout = async () => {
    let token = await SecureStore.getItemAsync('token');
    try {
        await axios.post(url = `${baseUrl}/logout`, data = {
        }, config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    } catch (err) {
        throw err;
    }
}

export const register = async (email, password) => {
    try {
        let response = await axios.post(url = `${baseUrl}/register`, data = {
            'email': email,
            'password': password,
        }, config = {
            headers: jsonHeaders,
        });
        console.log(response);
    } catch (err) {
        throw err;
    }
}
