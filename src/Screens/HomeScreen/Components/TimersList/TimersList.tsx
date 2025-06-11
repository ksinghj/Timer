import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, Pressable } from 'react-native';
import * as LiveActivities from '@local:live-activities';
import { useShallow } from 'zustand/react/shallow';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Timer } from '@/src/Components/Timer';
import { Spacer } from '@/src/Components/Spacer';
import { useAllTimersStore } from '@/src/State/AllTimers';
import type { Timer as ITimer } from '@/src/Types';
import { getTimerLiveActivityData } from '@/src/Utils';

export const TimersList: React.FC = () => {
  const { timers, toggleTimerPaused, removeTimer } = useAllTimersStore(
    useShallow((state) => ({
      timers: state.timers,
      toggleTimerPaused: state.toggleTimerPaused,
      removeTimer: state.removeTimer,
    }))
  );

  // DEV quick reset
  // if (__DEV__) {
  //   timers.forEach((timer) => {
  //     removeTimer(timer.id);
  //   });
  // }

  const handleRemoveTimer = useCallback(
    (timerId: string) => {
      const timer = timers.get(timerId);
      removeTimer(timerId);

      // End live activity
      if (timer && LiveActivities.areActivitiesEnabled()) {
        const liveActivityData = getTimerLiveActivityData(timer);
        LiveActivities.endActivity(timerId, liveActivityData);
      }
    },
    [removeTimer, timers]
  );

  const renderRightActions = useCallback(
    (prog: SharedValue<number>, drag: SharedValue<number>, timerId: string) => {
      const styleAnimation = useAnimatedStyle(() => {
        return {
          transform: [{ translateX: drag.value + 80 }],
        };
      });

      return (
        <Reanimated.View style={styleAnimation}>
          <Pressable style={styles.deleteAction} onPress={() => handleRemoveTimer(timerId)}>
            <Text style={styles.deleteText}>Delete</Text>
          </Pressable>
        </Reanimated.View>
      );
    },
    [handleRemoveTimer]
  );

  const renderItem = useCallback(
    ({ item }: { item: ITimer }) => {
      return (
        <ReanimatedSwipeable
          friction={2}
          rightThreshold={40}
          renderRightActions={(prog, drag) => renderRightActions(prog, drag, item.id)}
        >
          <Timer timer={item} togglePause={toggleTimerPaused} />
        </ReanimatedSwipeable>
      );
    },
    [toggleTimerPaused, renderRightActions]
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

const styles = StyleSheet.create({
  deleteAction: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
