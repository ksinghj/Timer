import React, { forwardRef, useCallback } from 'react';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetModalProvider,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { Container } from '@/src/Components/Container';
import { AppText } from '@/src/Components/Text';
import { getAppColors, Theme } from '@/src/Theme';
import { HorizontalSpacer, Spacer } from '@/src/Components/Spacer';
import { useTimerStore } from '@/src/State/Timer';
import { TimerControl } from '../TimerControl';
import { IconSymbol } from '@/src/Components/UI/IconSymbol';
import type { Timer } from '@/src/Types';
import { guid } from '@/src/Utils';

type Props = {
  startTimer: (timer: Timer) => void;
};

export const CreateTimerSheet = forwardRef<BottomSheet, Props>(({ startTimer }, ref) => {
  const { timer, setTimerValue } = useTimerStore();
  const appColors = getAppColors();

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} />, []);

  const handleCreateTimer = useCallback(() => {
    const newTimer: Timer = {
      id: guid(),
      value: {
        hours: timer.hours,
        minutes: timer.minutes,
        seconds: timer.seconds,
      },
      label: timer.label,
      paused: false,
      startTime: Date.now(),
    };
    startTimer(newTimer);
  }, [timer.hours, timer.minutes, timer.seconds, timer.label, startTimer]);

  return (
    <BottomSheetModalProvider>
      <BottomSheet
        backdropComponent={renderBackdrop}
        ref={ref}
        enablePanDownToClose
        index={-1}
        snapPoints={['95%']}
        backgroundStyle={{ backgroundColor: appColors.backgroundSecondary }}>
        <BottomSheetView>
          <Container paddingHorizontal={Theme.DefaultPadding}>
            <Container paddingHorizontal={2}>
              <AppText color="contentPrimary" size={24} weight="bold">
                Create timer
              </AppText>
            </Container>
            <Spacer size={6} />
            <Container paddingHorizontal={2}>
              <AppText color="contentPrimary">Hours</AppText>
            </Container>
            <Spacer size={2} />
            <TimerControl increment={1} value={timer.hours} setValue={(val) => setTimerValue('hours', val)} />
            <Spacer />
            <Container paddingHorizontal={2}>
              <AppText color="contentPrimary">Minutes</AppText>
            </Container>
            <Spacer size={2} />
            <TimerControl increment={1} value={timer.minutes} setValue={(val) => setTimerValue('minutes', val)} />
            <Spacer />
            <Container paddingHorizontal={2}>
              <AppText color="contentPrimary">Seconds</AppText>
            </Container>
            <Spacer size={2} />
            <TimerControl increment={10} value={timer.seconds} setValue={(val) => setTimerValue('seconds', val)} />
            <Spacer size={8} />
            <Container
              horizontal
              smallRounded
              justify="space-between"
              align="center"
              padding={Theme.DefaultPadding}
              backgroundColor="fillSecondary">
              <AppText color="contentPrimary">Label</AppText>
              <Container horizontal center>
                <AppText weight="medium" color="contentSecondary">
                  {timer.label}
                </AppText>
                <HorizontalSpacer size={2} />
                <IconSymbol name="chevron.right" size={20} color={appColors.contentSecondary} />
              </Container>
            </Container>
            <Spacer size={8} />
            <Container
              roundedFull
              backgroundColor="green20"
              onPress={handleCreateTimer}
              alignSelf="center"
              center
              horizontal
              padding={2}
              width={75}
              height={75}>
              <AppText color="green">Start</AppText>
            </Container>
          </Container>
        </BottomSheetView>
      </BottomSheet>
    </BottomSheetModalProvider>
  );
});
