import { requireNativeView } from 'expo';
import * as React from 'react';

import { TimerModuleViewProps } from './TimerModule.types';

const NativeView: React.ComponentType<TimerModuleViewProps> =
  requireNativeView('TimerModule');

export default function TimerModuleView(props: TimerModuleViewProps) {
  return <NativeView {...props} />;
}
