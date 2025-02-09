import { requireNativeModule, Platform } from 'expo-modules-core';

const fallback = {
  areActivitiesEnabled: () => false,
  startActivity(_name: string) {
    return false;
  },
  // endActivity(_title: string, _headline: string, _widgetUrl: string) {},
};

export default Platform.OS === 'ios' ? requireNativeModule('TimerModule') : fallback;
