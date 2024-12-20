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
      addTimer: (timer) => set((state) => ({ timers: new Map(state.timers.set(timer.id, timer)) })),
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
              // resume timer
              timer.lastResumed = timer.lastPaused!; // has to have been set before to get here
              timer.paused = false;
              timer.lastPaused = null;
            } else {
              // pause timer
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

function calculateNewTime(currentTime: { hours: number; minutes: number; seconds: number }, timePausedFor: number) {
  // Calculate the new time after resuming from pause
  let seconds = currentTime.seconds + timePausedFor / 1000;
  let minutes = currentTime.minutes + Math.floor(seconds / 60);
  let hours = currentTime.hours + Math.floor(minutes / 60);

  // Normalize seconds and minutes
  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24; // Keep hours within a 24-hour range

  return {
    hours: Math.floor(hours),
    minutes: Math.floor(minutes),
    seconds: Math.floor(seconds),
  };
}
