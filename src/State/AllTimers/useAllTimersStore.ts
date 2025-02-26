import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Timer } from '@/src/Types';
import { StorageOptions } from '@/src/Utils';

type AllTimersStore = {
  timers: Map<string, Timer>;
  addTimer: (timer: Timer) => void;
  removeTimer: (id: string) => void;
  toggleTimerPaused: (id: string) => void;
};

export const useAllTimersStore = create(
  persist<AllTimersStore>(
    (set) => ({
      timers: new Map<string, Timer>(),
      addTimer: (timer) =>
        set((state) => ({
          timers: new Map(state.timers.set(timer.id, timer)),
        })),
      removeTimer: (id) =>
        set((state) => {
          state.timers.delete(id);
          return { timers: new Map(state.timers) };
        }),
      toggleTimerPaused: (id) =>
        set((state) => {
          const timer = state.timers.get(id);
          if (timer) {
            if (timer.paused) {
              // Calculate the paused duration
              const pausedDuration = Date.now() - (timer.lastPaused || 0);
              // Adjust the startTime by adding the paused duration
              timer.startTime += pausedDuration;
              timer.paused = false;
              timer.lastPaused = null;
            } else {
              // Pause the timer
              timer.lastPaused = Date.now();
              timer.paused = true;
            }
          }
          return { timers: new Map(state.timers) };
        }),
    }),
    {
      name: 'all-timers-store-1',
      storage: createJSONStorage(() => AsyncStorage, StorageOptions),
      // @ts-ignore only want to persist the timers state
      partialize({ timers }) {
        return { timers };
      },
      // onRehydrateStorage: (state) => {
      //   // Ensure the timers state is a Map after rehydration
      //   if (state?.timers && !(state.timers instanceof Map)) {
      //     state.timers = new Map(state.timers);
      //   }
      // },
    }
  )
);

