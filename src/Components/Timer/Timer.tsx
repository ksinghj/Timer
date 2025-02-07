import React, { useEffect, useMemo, useState } from 'react';
import { Container } from '../Container';
import type { Timer as ITimer } from '@/src/Types';
import { Theme } from '@/src/Theme';
import { AppText } from '../Text';
import { Spacer } from '../Spacer';
import { IconSymbol } from '../UI/IconSymbol';
import { formatTimerValue } from '@/src/Utils';

type Props = { timer: ITimer; togglePause: (timerId: string) => void };

type Countdown = { hours: number; minutes: number; seconds: number };

export const Timer: React.FC<Props> = ({ timer, togglePause }) => {
  const { id, paused, startTime, duration, lastPaused } = timer;
  const [countdown, setCountdown] = useState<Countdown | null>(null);
  const { hours, minutes, seconds } = countdown || {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((tick) => tick + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // set initial countdown
  useEffect(() => {
    const now = Date.now();
    const remaining =
      duration - Math.round(((lastPaused || now) - startTime) / 1000);

    setCountdown({
      hours: Math.floor(remaining / 3600),
      minutes: Math.floor((remaining % 3600) / 60),
      seconds: Math.floor(remaining % 60),
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused) {
        return;
      }

      const now = Date.now();
      const remaining = Math.round((now - startTime) / 1000);
      const remainingDuration = duration - remaining;

      setCountdown({
        hours: Math.floor(remainingDuration / 3600),
        minutes: Math.floor((remainingDuration % 3600) / 60),
        seconds: Math.floor(remainingDuration % 60),
      });
    }, 1000);

    if (paused) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [paused]);

  // get total time of timer regardless of pause, using startTime
  const originalValues = useMemo(() => {
    return {
      hours: Math.floor(duration / 3600),
      minutes: Math.floor((duration % 3600) / 60),
      seconds: Math.floor(duration % 60),
    };
  }, [duration]);

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
          {timer.label} - {originalValues.hours}h {originalValues.minutes}m{' '}
          {originalValues.seconds}s
        </AppText>
      </Container>
      <Container hitSlop={15} onPress={() => togglePause(id)}>
        <IconSymbol name={paused ? 'play' : 'pause'} size={24} color="white" />
      </Container>
    </Container>
  );
};
