import { CodedError, EventSubscription } from 'expo-modules-core';
import { useEffect } from 'react';
import type { LiveActivityFn, onPushTokenChangePayload } from './src/LiveActivities.types';
import LiveActivitiesModule from './src/LiveActivitiesModule';

// left comments in with credits to @mrevanzak for the original module, modified for this use case

/**
 * Live Activities module.
 * @author github.com/mrevanzak
 */

export function addPushTokenListener(
  listener: (event: onPushTokenChangePayload) => void
): EventSubscription {
  return LiveActivitiesModule.addListener('LiveActivities.pushTokenDidChange', listener);
}

export function addStartToPushTokenListener(
  listener: (event: onPushTokenChangePayload) => void
): EventSubscription {
  return LiveActivitiesModule.addListener('LiveActivities.startTokenDidChange', listener);
}

/**
 * Subscribes to the push token changes.
 */
export function useGetPushToken(fn: (opt: onPushTokenChangePayload) => void) {
  useEffect(() => {
    const subscription = addPushTokenListener(fn);
    return () => {
      subscription.remove();
    };
  }, []);
}

/**
 * setup the live activities
 * subscribe to the push token changes
 */
export function useLiveActivitiesSetup(fn: (opt: onPushTokenChangePayload) => void) {
  useEffect(() => {
    const subscription = addStartToPushTokenListener(fn);
    return () => {
      subscription.remove();
    };
  }, []);
}

/**
 * Checks if the Live Activity feature is enabled on the current device.
 * iOS 16.2+
 * @platform ios
 */
export function areActivitiesEnabled(): boolean {
  return LiveActivitiesModule.areActivitiesEnabled();
}

function validateActivityOptions({ timerId }: { timerId: string }) {
  if (!timerId || typeof timerId !== 'string') {
    throw new CodedError(
      'ERR_ACTIVITY_INVALID_OPTIONS',
      'Timer ID is required and must be a string'
    );
  }
}

/**
 * Starts an iOS Live Activity.
 */
export const startActivity: LiveActivityFn = (
  key,
  { timerId, title, startTime, duration, paused, lastPaused, widgetUrl }
) => {
  validateActivityOptions({ timerId });
  try {
    LiveActivitiesModule.startActivity(
      key,
      timerId,
      title,
      startTime,
      duration,
      paused,
      lastPaused,
      widgetUrl
    );
  } catch (error) {
    console.error(error);
    throw new CodedError('ERR_ACTIVITY_START', 'Could not start activity');
  }
};

/**
 * Updates an iOS Live Activity.
 */
export const updateActivity: LiveActivityFn = (
  key,
  { timerId, title, startTime, duration, paused, lastPaused, widgetUrl }
) => {
  validateActivityOptions({ timerId });
  LiveActivitiesModule.updateActivity(
    key,
    timerId,
    title,
    startTime,
    duration,
    paused,
    lastPaused,
    widgetUrl
  );
};

/**
 * Ends an iOS Live Activity.
 */
export const endActivity: LiveActivityFn = (
  key,
  { timerId, title, startTime, duration, paused, lastPaused, widgetUrl }
) => {
  validateActivityOptions({ timerId });
  LiveActivitiesModule.endActivity(
    key,
    timerId,
    title,
    startTime,
    duration,
    paused,
    lastPaused,
    widgetUrl
  );
};
