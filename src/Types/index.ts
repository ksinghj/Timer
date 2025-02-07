// Domain
export type Timer = {
  id: string; // uuid
  label: string;
  paused: boolean;
  startTime: number;
  duration: number; // duration in seconds
  lastPaused: number | null; // timestamp
};
