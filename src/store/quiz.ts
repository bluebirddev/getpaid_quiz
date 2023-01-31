/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

type StoreState = {
  answers: Record<string, any>;
  setAnswer: (key: string, answer: any) => void;
};

function getFromLocalStorage() {
  const answers = localStorage.getItem('answers');
  if (answers) {
    return JSON.parse(answers);
  }
  return {};
}
function saveToLocalStorage(answers: Record<string, any>) {
  localStorage.setItem('answers', JSON.stringify(answers));
}

/**
 * The local/in-memory store.  Use this for "global" state (that is not coming
 * from react-query)
 */
export const useQuizStore = create<StoreState>((set) => ({
  answers: getFromLocalStorage(),
  setAnswer: (key, answer) => {
    return set((r) => {
      const answers = { ...r.answers, [key]: answer };
      saveToLocalStorage(answers);
      return { answers };
    });
  },
}));
