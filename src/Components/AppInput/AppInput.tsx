import React, { useMemo, useState } from 'react';
import { TextInput, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Theme, ThemeColor, getAppColors } from '../../Theme';
import { Container } from '../Container';
import { HorizontalSpacer } from '../Spacer';

type Props = TextInputProps & {
  fontSize?: number;
  fontFamily?: keyof typeof Theme.Fonts;
  textColor?: ThemeColor;
  backgroundColor?: ThemeColor;
  placeholderColor?: ThemeColor;
  leftAccessoryView?: React.ReactElement;
  rightAccessoryView?: React.ReactElement;
  paddingHorizontal?: number;
  paddingVertical?: number;
  fontWeight?: TextStyle['fontWeight'];
  bottomSheet?: boolean;
};

export const AppInput = React.forwardRef<TextInput | typeof BottomSheetTextInput, Props>(
  (
    {
      textColor = 'contentPrimary',
      placeholderColor = 'contentPrimary',
      backgroundColor = 'backgroundSecondary',
      fontSize = 17,
      fontFamily = 'Regular',
      fontWeight = '400',
      leftAccessoryView,
      rightAccessoryView,
      paddingVertical = 3,
      paddingHorizontal = Theme.DefaultPadding,
      bottomSheet = false,
      style,
      ...props
    },
    ref
  ) => {
    const appColors = getAppColors();
    const calculatedStyle = useMemo(
      () => ({
        ...{ fontSize, fontFamily: Theme.Fonts[fontFamily] },
        color: appColors[textColor],
        paddingVertical: paddingVertical * Theme.UxUnit,
        paddingHorizontal: paddingHorizontal * Theme.UxUnit,
        fontWeight: fontWeight as TextStyle['fontWeight'],
        ...(style ? (style as ViewStyle) : {}),
      }),
      [fontFamily, fontSize, paddingHorizontal, paddingVertical, style, textColor, fontWeight]
    );
    const TextInputComponent = bottomSheet ? BottomSheetTextInput : TextInput;
    return (
      <Container smallRounded horizontal align="center" backgroundColor={backgroundColor}>
        {/** Render left accessory view if set */}
        {leftAccessoryView ? <HorizontalSpacer /> : null}
        {leftAccessoryView}
        {/** Render text input */}
        <Container flex={1}>
          <TextInputComponent
            style={calculatedStyle}
            // @ts-ignore - this is fine both refs are compatible
            ref={ref}
            placeholderTextColor={placeholderColor ? appColors[placeholderColor] : appColors.white}
            {...props}
          />
        </Container>
        {/** Render right accessory view if set */}
        {rightAccessoryView}
        {rightAccessoryView ? <HorizontalSpacer /> : null}
      </Container>
    );
  }
);

type SecureProps = Omit<Props, 'secureTextEntry'>;

export const AppInputSecure = React.forwardRef<TextInput, SecureProps>((props, ref) => {
  const [isSecure, setIsSecure] = useState(true);
  const toggleIsSecure = () => setIsSecure(!isSecure);
  return (
    <AppInput
      ref={ref}
      {...props}
      secureTextEntry={isSecure}
      rightAccessoryView={
        <Container onPress={toggleIsSecure}>
          <AppMaterialCommunityIcon icon="eye" color="subText" />
        </Container>
      }
    />
  );
});
