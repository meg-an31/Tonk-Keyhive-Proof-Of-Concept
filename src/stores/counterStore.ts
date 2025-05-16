// stores/counterStore.ts
import { create } from "zustand";
import { sync, DocumentId } from '@tonk/keepsync';

interface CounterState {
  counts: {id: number, num: number}[];
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>(
  sync(
    // The store implementation
    (set) => ({
      counts: [{id: 0, num: 0}, {id: 1, num: 0}, {id: 2, num: 0}, {id: 3, num: 0}],

      // Increment the counter
      increment: () => {
        const userId = Number(localStorage.getItem('username'));
        set((state) => ({ counts: state.counts.map((count) => count.id === userId ? { ...count, num: count.num + 1 } : count) }));
      },

      // Decrement the counter
      decrement: () => {
        const userId = Number(localStorage.getItem('username'));
        set((state) => ({ counts: state.counts.map((count) => count.id === userId ? { ...count, num: count.num - 1 } : count) }));
      },

      // Reset the counter
      reset: () => {
        const userId = Number(localStorage.getItem('username'));
        set((state) => ({ counts: state.counts.map((count) => count.id === userId ? { ...count, num: 0} : count) }));
      },
    }),
    // Sync configuration
    {
      docId: "counter" as DocumentId,
      // Optional: configure initialization timeout
      initTimeout: 30000,
      // Optional: handle initialization errors
      onInitError: (error) =>
        console.error("Sync initialization error:", error),
    }
  )
);
