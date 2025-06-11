/**
 * state of the live activity
 * should be match with property on Attributes.swift
 * @see ios/Attributes.swift
 */
export interface LiveActivityState {
  timerId: string;
  title: string;
  startTime: number; // Unix timestamp in milliseconds
  duration: number; // Duration in seconds
  paused: boolean;
  lastPaused?: number; // Unix timestamp in milliseconds
  widgetUrl?: string;
}

export interface onPushTokenChangePayload {
  token: string;
}

export type LiveActivitiesModuleEvent = {
  "LiveActivities.pushTokenDidChange": (
    params: onPushTokenChangePayload & { key: string },
  ) => void;
  "LiveActivities.startTokenDidChange": (
    params: onPushTokenChangePayload,
  ) => void;
};

export type LiveActivityFn = (key: string, state: LiveActivityState) => void;
