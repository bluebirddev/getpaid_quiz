/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { useEffect } from 'react';
import { upsertUserId } from '~/api';

type StoreState = {
    userId: string | undefined;
    setUserId: (userId: string | undefined) => void;
};

function getFromLocalStorage() {
    return localStorage.getItem('userId') || undefined;
}
function saveToLocalStorage(userId: string | undefined) {
    if (userId) {
        return localStorage.setItem('userId', userId);
    }
    return localStorage.removeItem('userId');
}

/**
 * The local/in-memory store.  Use this for "global" state (that is not coming
 * from react-query)
 */
export const useUserIdStore = create<StoreState>((set) => ({
    userId: getFromLocalStorage(),
    setUserId: (userId) => {
        return set(() => {
            saveToLocalStorage(userId);
            return { userId };
        });
    },
}));

export function useSyncUserId(): null {
    const { userId, setUserId } = useUserIdStore();

    useEffect(() => {
        (async () => {
            const newUserId = await upsertUserId(userId);
            setUserId(newUserId);
        })();
    }, []);

    return null;
}
