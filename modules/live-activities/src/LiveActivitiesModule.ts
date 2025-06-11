import { NativeModule, requireNativeModule } from "expo-modules-core";
import type { LiveActivitiesModuleEvent } from "./LiveActivities.types";

class ExpoLiveActivities extends NativeModule<LiveActivitiesModuleEvent> {
  areActivitiesEnabled() {
    return false;
  }
  startActivity(
    _key: string,
    _timerId: string,
    _title: string,
    _startTime: number,
    _duration: number,
    _paused: boolean,
    _lastPaused?: number,
    _widgetUrl?: string
  ) {
    return;
  }
  updateActivity(
    _key: string,
    _timerId: string,
    _title: string,
    _startTime: number,
    _duration: number,
    _paused: boolean,
    _lastPaused?: number,
    _widgetUrl?: string
  ) {
    return;
  }
  endActivity(
    _key: string,
    _timerId: string,
    _title: string,
    _startTime: number,
    _duration: number,
    _paused: boolean,
    _lastPaused?: number,
    _widgetUrl?: string
  ) {
    return;
  }
}

export default requireNativeModule<ExpoLiveActivities>('ExpoLiveActivities');
