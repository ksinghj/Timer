import { Container } from '@/src/Components/Container';
import { AppScreen } from '@/src/Components/Screen';
import { AppText } from '@/src/Components/Text';
import { IconSymbol } from '@/src/Components/UI/IconSymbol';
import { getAppColors } from '@/src/Theme';

export const HomeScreen: React.FC = () => {
  const appColors = getAppColors();

  const handleAddTimer = () => {
    console.log('Add timer');
    // TODO: Start simple LiveActivity here
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
    </AppScreen>
  );
};
