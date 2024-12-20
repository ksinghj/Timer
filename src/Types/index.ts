// Domain
export type Timer = {
  id: string; // uuid
  label: string;
  paused: boolean;
  startTime: number;
  endTime: number;
  lastPaused: number | null; // timestamp
  lastResumed: number; // timestamp, initial value is startTime
};
