// stores/counterStore.ts
import { create } from "zustand";
import { sync, DocumentId } from '@tonk/keepsync';

interface ProfileStore {
  people: { name: string; id: number }[];
  // everyone chooses how "connected" they want to be to the other users in their network
  connections: number[][];
  update_connection: (id: number) => void;
  connection_exists: (to:number, from:number) => number;
}

export const useProfileStore = create<ProfileStore>(
  sync(
    // The store implementation
    (set, get) => ({
      // example data that lives in the store. potentially should encrypt ...
      // this is structured like this because the state is MERGED, not overwritten
      // so restarting the application does not overwrite the existing data with this.
      people: [{ name: "Alice", id: 0 }, { name: "Bob", id: 1 }, { name: "Charlie", id: 2 }, { name: "Diana", id: 3 }],
      connections: new Array(4).fill(0).map(() => new Array(4).fill(0)),
      
      // get the connection level between two users
      connection_exists : (from:number, to:number) =>{
        const userId = Number(localStorage.getItem('username'));
        return get().connections[userId][to];
      },

      // update a user's connection to another user
      update_connection: (id: number) => {
        set((state) => {
          const connections_deep_copy: number[][] = new Array(4).fill(0).map(() => new Array(4).fill(0))
          for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
              connections_deep_copy[i][j] = state.connections[i][j];
            }
          }
          const userId = Number(localStorage.getItem('username'));
          connections_deep_copy[userId][id] = (state.connections[userId][id] + 1) % 4; 
          return {
            ...state, // Preserve other state
            connections: connections_deep_copy
          };
        });
      },

    }),
    // Sync configuration
    {
      docId: "profile" as DocumentId,
      // Optional: configure initialization timeout
      initTimeout: 30000,
      // Optional: handle initialization errors
      onInitError: (error) =>
        console.error("Sync initialization error:", error),
    }
  )
);
