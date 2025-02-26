import { create } from 'zustand';

type Field = 'hours' | 'minutes' | 'seconds';

export type ITimerStore = {
  timer: {
    hours: number;
    minutes: number;
    seconds: number;
    label: string;
  };
  setTimerValue: (field: Field, val: number) => void;
};

export const useTimerStore = create<ITimerStore>((set) => ({
  timer: {
    hours: 0,
    minutes: 0,
    seconds: 0,
    label: 'Timer',
  },
  setTimerValue: (field, val) => set((state) => ({ timer: { ...state.timer, [field]: val } })),
}));
