import React, { useEffect, useState } from 'react';
import { Container } from '../Container';
import type { Timer as ITimer } from '@/src/Types';
import { Theme } from '@/src/Theme';
import { AppText } from '../Text';
import { Spacer } from '../Spacer';
import { IconSymbol } from '../UI/IconSymbol';
import { formatTimerValue } from '@/src/Utils';

type Props = { timer: ITimer; togglePause: (timerId: string) => void };

export const Timer: React.FC<Props> = ({ timer, togglePause }) => {
  const { id } = timer;

  // Force re-render every second to update countdown
  const [, setTick] = useState(0);

  useEffect(() => {
    // Only tick if timer is running
    if (!timer.paused) {
      const interval = setInterval(() => {
        setTick((tick) => tick + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer.paused]);

  // Simple countdown calculation
  const now = Date.now();
  let elapsedMs: number;

  if (timer.paused && timer.lastPaused) {
    elapsedMs = timer.lastPaused - timer.startTime;
  } else if (timer.paused) {
    elapsedMs = 0;
  } else {
    elapsedMs = now - timer.startTime;
  }

  const totalMs = timer.duration * 1000;
  const remainingMs = Math.max(0, totalMs - elapsedMs);
  const remainingSeconds = Math.ceil(remainingMs / 1000);

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  // Get original timer duration for display
  const originalHours = Math.floor(timer.duration / 3600);
  const originalMinutes = Math.floor((timer.duration % 3600) / 60);
  const originalSecs = Math.floor(timer.duration % 60);

  return (
    <Container
      paddingVertical={Theme.DefaultPadding}
      horizontal
      align="center"
      justify="space-between"
    >
      <Container>
        <Container horizontal align="center">
          {hours > 0 && (
            <>
              <AppText color="contentPrimary" size={34}>
                {formatTimerValue(hours)}
              </AppText>
              <AppText color="contentPrimary" size={34}>
                :
              </AppText>
            </>
          )}
          <AppText color="contentPrimary" size={34}>
            {formatTimerValue(minutes)}
          </AppText>
          <AppText color="contentPrimary" size={34}>
            :
          </AppText>
          <AppText color="contentPrimary" size={34}>
            {formatTimerValue(seconds)}
          </AppText>
        </Container>
        <Spacer size={2} />
        <AppText color="contentSecondary" size={15}>
          {timer.label} - {originalHours}h {originalMinutes}m {originalSecs}s
        </AppText>
      </Container>
      <Container hitSlop={15} onPress={() => togglePause(id)}>
        <IconSymbol name={timer.paused ? 'play' : 'pause'} size={24} color="white" />
      </Container>
    </Container>
  );
};
