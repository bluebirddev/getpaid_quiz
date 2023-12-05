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

export async function postSubmission(
    userId: string,
    queryParams: Record<string, string>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    submission: any
) {
    await api.post('/submission', { ...submission, user_id: userId, referral_codes: queryParams });
}

export async function upsertUserId(userId: string | undefined): Promise<string> {
    const res = await api.post(`/upsertUserId`, { user_id: userId });
    return res.data;
}
