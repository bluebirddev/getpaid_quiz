import create from 'zustand';
import { LoginResponse } from '~/api/model';
import { clearUserFromStorage, saveUserToStorage } from '../auth';
import queryClient from '../query-client';

type StoreState = {
  user: LoginResponse | undefined;
  setUser: (user: LoginResponse) => void;
  clearUser: () => void;
  loading: boolean;
};

/**
 * The local/in-memory store.  Use this for "global" state (that is not coming
 * from react-query)
 */
export const useStore = create<StoreState>((set) => ({
  user: undefined,
  loading: true,
  setUser: (user) => {
    saveUserToStorage(user);
    set({ user, loading: false });
  },
  clearUser: () => {
    clearUserFromStorage();
    set({ user: undefined, loading: false });
    queryClient.clear();
  },
}));
