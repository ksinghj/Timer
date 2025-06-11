import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Timer } from '@/src/Types';
import { StorageOptions } from '@/src/Utils';
import { getTimerLiveActivityData } from '@/src/Utils';
import * as LiveActivities from '@local:live-activities';

type AllTimersStore = {
  timers: Map<string, Timer>;
  addTimer: (timer: Timer) => void;
  removeTimer: (id: string) => void;
  toggleTimerPaused: (id: string) => void;
};

export const useAllTimersStore = create(
  persist<AllTimersStore>(
    (set, get) => ({
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
          if (!timer) return state;

          if (timer.paused) {
            // Resume timer: Calculate the paused duration and adjust startTime
            const pausedDuration = Date.now() - (timer.lastPaused || 0);
            timer.startTime += pausedDuration;
            timer.paused = false;
            timer.lastPaused = null;
          } else {
            // Pause timer
            timer.lastPaused = Date.now();
            timer.paused = true;
          }

          // Update LiveActivity with new timer state
          if (LiveActivities.areActivitiesEnabled()) {
            try {
              const liveActivityData = getTimerLiveActivityData(timer);
              LiveActivities.updateActivity(timer.id, liveActivityData);
            } catch (error) {
              console.warn('Failed to update LiveActivity:', error);
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
    }
  )
);

