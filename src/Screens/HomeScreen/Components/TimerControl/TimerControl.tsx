import React from 'react';
import { TextInput } from 'react-native';
import { Container } from '@/src/Components/Container';
import { getAppColors, Theme } from '@/src/Theme';
import { IconSymbol } from '@/src/Components/UI/IconSymbol';

type Props = {
  increment: number;
  value: number;
  setValue: (val: number) => void;
};

export const TimerControl: React.FC<Props> = ({ increment = 1, value, setValue }) => {
  const appColors = getAppColors();

  const handleIncrement = () => {
    setValue(value + increment);
  };

  const handleDecrement = () => {
    setValue(value - increment);
  };

  return (
    <Container
      horizontal
      align="center"
      justify="space-between"
      backgroundColor="fillSecondary"
      paddingHorizontal={2}
      paddingVertical={2}
      rounded>
      <Container
        hitSlop={12}
        horizontal
        center
        // backgroundColor="buttonSecondaryDefault"
        rounded
        padding={2}
        onPress={handleDecrement}>
        <IconSymbol name="minus" color="grey" />
      </Container>
      <TextInput
        keyboardType="numeric"
        value={value.toString()}
        onChangeText={(val) => setValue(+val)}
        returnKeyLabel="done"
        textAlign="center"
        style={{
          fontWeight: '500',
          backgroundColor: 'transparent',
          fontSize: 34,
          color: appColors.contentPrimary,
          fontFamily: Theme.Fonts.Medium,
        }}
      />
      <Container
        hitSlop={12}
        horizontal
        center
        // backgroundColor="buttonSecondaryDefault"
        rounded
        padding={2}
        onPress={handleIncrement}>
        <IconSymbol name="plus" color="grey" />
      </Container>
    </Container>
  );
};
