import axios from 'axios';

const API_HOST = import.meta.env.VITE_API_HOST;

export const api = axios.create({
    baseURL: API_HOST,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function isAvailable(params: { tel?: string; email?: string }) {
    try {
        await api.get('/check', { params });
        return true;
    } catch (err) {
        return false;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function postSubmission(submission: any) {
    await api.post('/submission', submission);
}
