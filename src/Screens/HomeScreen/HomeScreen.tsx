import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';
import { Container } from '@/src/Components/Container';
import { AppScreen } from '@/src/Components/Screen';
import { AppText } from '@/src/Components/Text';
import { IconSymbol } from '@/src/Components/UI/IconSymbol';
import { getAppColors } from '@/src/Theme';
import { CreateTimerSheet } from './Components';

export const HomeScreen: React.FC = () => {
  const appColors = getAppColors();
  const createTimerSheetRef = React.useRef<BottomSheet>(null);

  const handleAddTimer = () => {
    console.log('Add timer');
    createTimerSheetRef.current?.expand();
  };

  const handleStartTimer = () => {
    console.log('Start timer');
    createTimerSheetRef.current?.close();
  };

  return (
    <AppScreen topSafeArea>
      <Container horizontal align="center" justify="space-between" backgroundColor="black">
        <AppText color="white" size={24}>
          Timer
        </AppText>
        <Container onPress={handleAddTimer}>
          <IconSymbol name="plus" size={22} color={appColors.main} />
        </Container>
      </Container>
      <CreateTimerSheet ref={createTimerSheetRef} startTimer={handleStartTimer} />
    </AppScreen>
  );
};
