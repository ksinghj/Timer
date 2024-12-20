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
  const { id, paused, startTime, endTime, lastPaused, lastResumed } = timer;
  const [countdown, setCountdown] = useState<Countdown | null>(null);
  const { hours, minutes, seconds } = countdown || { hours: 0, minutes: 0, seconds: 0 };
  const [countdownSet, setCountdownSet] = useState(false);

  // get total time of timer regardless of pause, using startTime
  const originalValues = useMemo(() => {
    const diffInSeconds = Math.abs(endTime - startTime) / 1000;
    return {
      hours: Math.floor(diffInSeconds / 3600),
      minutes: Math.floor((diffInSeconds % 3600) / 60),
      seconds: Math.floor(diffInSeconds % 60),
    };
  }, [startTime]);

  // Set initial countdown value
  useEffect(() => {
    const diffMillis = paused ? endTime - lastPaused! : endTime - lastResumed - (Date.now() - lastResumed);
    const diffHours = Math.floor(diffMillis / 1000 / 60 / 60);
    const diffMinutes = Math.floor((diffMillis / 1000 / 60) % 60);
    const diffSeconds = Math.floor((diffMillis / 1000) % 60);

    setCountdown({ hours: diffHours, minutes: diffMinutes, seconds: diffSeconds });
    setCountdownSet(true);
  }, [startTime]);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null;

    if (countdownSet && countdown && !paused) {
      timerInterval = setInterval(() => {
        setCountdown((prev) => {
          if (!prev) return { hours: 0, minutes: 0, seconds: 0 };

          let { hours, minutes, seconds } = prev;

          seconds -= 1;

          if (seconds < 0) {
            seconds = 59;
            minutes -= 1;
          }

          if (minutes < 0) {
            minutes = 59;
            hours -= 1;
          }

          if (hours <= 0 && minutes <= 0 && seconds <= 0) {
            clearInterval(timerInterval!);
            return { hours: 0, minutes: 0, seconds: 0 };
          }

          return { hours, minutes, seconds };
        });
      }, 1000);
    } else {
      if (timerInterval) clearInterval(timerInterval);
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [paused, countdownSet]);

  return (
    <Container paddingVertical={Theme.DefaultPadding} horizontal align="center" justify="space-between">
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
          {timer.label} - {originalValues.hours}h {originalValues.minutes}m {originalValues.seconds}s
        </AppText>
      </Container>
      <Container hitSlop={15} onPress={() => togglePause(id)}>
        <IconSymbol name={paused ? 'play' : 'pause'} size={24} color="white" />
      </Container>
    </Container>
  );
};
