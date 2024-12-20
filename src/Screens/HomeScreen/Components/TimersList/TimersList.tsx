import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import { Timer } from '@/src/Components/Timer';
import { Spacer } from '@/src/Components/Spacer';
import { useAllTimersStore } from '@/src/State/AllTimers';
import type { Timer as ITimer } from '@/src/Types';

export const TimersList: React.FC = () => {
  const { timers, toggleTimerPaused, removeTimer } = useAllTimersStore(
    useShallow((state) => ({
      timers: state.timers,
      toggleTimerPaused: state.toggleTimerPaused,
      removeTimer: state.removeTimer,
    }))
  );

  // DEV quick reset
  // timers.forEach((timer) => {
  //   removeTimer(timer.id);
  // });

  const renderItem = useCallback(
    ({ item }: { item: ITimer }) => {
      return <Timer timer={item} togglePause={toggleTimerPaused} />;
    },
    [toggleTimerPaused]
  );

  if (!timers || timers.size === 0) {
    return null;
  }

  return (
    <FlatList
      data={Array.from(timers.values())}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Spacer size={2} />}
    />
  );
};
