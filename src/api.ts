import axios from 'axios';

const API_HOST = import.meta.env.VITE_API_HOST;

export const api = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function isTelAvailable(tel: string) {
  try {
    await api.get('/check?tel=' + tel);
    return true;
  } catch (err) {
    return false;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function postSubmissions(submission: any) {
  try {
    await api.post('/submission', submission);
    return true;
  } catch (err) {
    return false;
  }
}

export async function sendVerificationEmail(email: string, name: string) {
  try {
    await api.post('/sendVerificationEmail', { email, name });
    return true;
  } catch (err) {
    return false;
  }
}
