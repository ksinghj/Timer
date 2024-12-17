// Domain
export type Timer = {
  id: string; // uuid
  value: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  label: string;
  paused: boolean;
  startTime: number;
  lastPausedAt?: number; // timestamp
};
