import type { Timer } from '@/src/Types';

/**
 * Get LiveActivity-compatible data - just pass the essential timer properties
 * Let Swift handle its own countdown calculations
 */
export function getTimerLiveActivityData(timer: Timer) {
  return {
    // Essential timer data
    timerId: timer.id,
    title: timer.label,
    startTime: timer.startTime,
    duration: timer.duration, // in seconds
    paused: timer.paused,
    lastPaused: timer.lastPaused ?? undefined,

    // Deep link
    widgetUrl: `timer://open/${timer.id}`,
  };
}
