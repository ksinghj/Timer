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
  const { value, id, paused, startTime, lastPausedAt } = timer;
  const { hours, minutes, seconds } = value;
  const [countdown, setCountdown] = useState({ hours, minutes, seconds });
  const { hours: newHours, minutes: newMinutes, seconds: newSeconds } = countdown;

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null;

    if (!paused) {
      timerInterval = setInterval(() => {
        setCountdown((prev) => {
          let newSeconds = prev.seconds - 1;
          let newMinutes = prev.minutes;
          let newHours = prev.hours;

          if (newSeconds < 0) {
            newSeconds = 59;
            newMinutes -= 1;
          }

          if (newMinutes < 0) {
            newMinutes = 59;
            newHours -= 1;
          }

          // Stop the timer when the countdown reaches 0
          if (newHours === 0 && newMinutes === 0 && newSeconds === 0) {
            clearInterval(timerInterval!);
          }

          return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
        });
      }, 1000);
    } else if (paused) {
      clearInterval(timerInterval!);
    }

    // Clean up the interval on component unmount or when paused
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [paused]);

  return (
    <Container paddingVertical={Theme.DefaultPadding} horizontal align="center" justify="space-between">
      <Container>
        <Container horizontal align="center">
          {hours > 0 && (
            <>
              <AppText color="contentPrimary" size={34}>
                {formatTimerValue(newHours)}
              </AppText>
              <AppText color="contentPrimary" size={34}>
                :
              </AppText>
            </>
          )}
          <AppText color="contentPrimary" size={34}>
            {formatTimerValue(newMinutes)}
          </AppText>
          <AppText color="contentPrimary" size={34}>
            :
          </AppText>
          <AppText color="contentPrimary" size={34}>
            {formatTimerValue(newSeconds)}
          </AppText>
        </Container>
        <Spacer size={2} />
        <AppText color="contentSecondary" size={15}>
          {timer.label} - {hours}h {minutes}m {seconds}s
        </AppText>
      </Container>
      <Container hitSlop={15} onPress={() => togglePause(id)}>
        <IconSymbol name={paused ? 'play' : 'pause'} size={24} color="white" />
      </Container>
    </Container>
  );
};
