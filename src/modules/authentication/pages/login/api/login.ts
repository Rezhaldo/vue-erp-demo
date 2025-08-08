import { APIClient } from '@shared/api';

type LoginProps = {
    username: string;
    password: string;
}

export async function login(user: LoginProps) {
    const response = await APIClient.post({path: '/auth/login', data: user });
	if (response.error) return Promise.reject(response.error);

    if (response.status === 200) {
        console.log('Login successful:', response.data);
        return response.data;
    } else {
        throw new Error(response.error || 'Login failed');
    }
}