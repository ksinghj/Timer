import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';
import { Container } from '@/src/Components/Container';
import { AppScreen } from '@/src/Components/Screen';
import { AppText } from '@/src/Components/Text';
import { IconSymbol } from '@/src/Components/UI/IconSymbol';
import { getAppColors, Theme } from '@/src/Theme';
import { CreateTimerSheet } from './Components';
import { useAllTimersStore } from '@/src/State/AllTimers';
import type { Timer } from '@/src/Types';
import { TimersList } from './Components/TimersList';
import { Spacer } from '@/src/Components/Spacer';

export const HomeScreen: React.FC = () => {
  const appColors = getAppColors();
  const createTimerSheetRef = React.useRef<BottomSheet>(null);
  const { addTimer } = useAllTimersStore();

  const handleAddTimer = () => {
    createTimerSheetRef.current?.expand();
  };

  const handleStartTimer = (timer: Timer) => {
    addTimer(timer);
    createTimerSheetRef.current?.close();
  };

  return (
    <AppScreen topSafeArea>
      <Container paddingHorizontal={Theme.DefaultPadding}>
        <Container horizontal align="center" justify="space-between" backgroundColor="black">
          <AppText color="white" size={24}>
            Timer
          </AppText>
          <Container onPress={handleAddTimer}>
            <IconSymbol name="plus" size={22} color={appColors.main} />
          </Container>
        </Container>
        <Spacer />
        <TimersList />
      </Container>
      <CreateTimerSheet ref={createTimerSheetRef} startTimer={handleStartTimer} />
    </AppScreen>
  );
};
