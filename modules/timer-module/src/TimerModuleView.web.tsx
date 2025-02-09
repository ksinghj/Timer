import * as React from 'react';

import { TimerModuleViewProps } from './TimerModule.types';

export default function TimerModuleView(props: TimerModuleViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
