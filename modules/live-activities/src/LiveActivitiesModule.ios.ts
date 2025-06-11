import { NativeModule, requireNativeModule } from "expo-modules-core";
import type { LiveActivitiesModuleEvent } from "./LiveActivities.types";

declare class ExpoLiveActivities extends NativeModule<LiveActivitiesModuleEvent> {
  areActivitiesEnabled(): boolean;
  startActivity(
    key: string,
    timerId: string,
    title: string,
    startTime: number,
    duration: number,
    paused: boolean,
    lastPaused?: number,
    widgetUrl?: string
  ): void;
  updateActivity(
    key: string,
    timerId: string,
    title: string,
    startTime: number,
    duration: number,
    paused: boolean,
    lastPaused?: number,
    widgetUrl?: string
  ): void;
  endActivity(
    key: string,
    timerId: string,
    title: string,
    startTime: number,
    duration: number,
    paused: boolean,
    lastPaused?: number,
    widgetUrl?: string
  ): void;
}

export default requireNativeModule<ExpoLiveActivities>("ExpoLiveActivities");
