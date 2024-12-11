import React, { useMemo } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { getAppColors, ThemeColor } from '@/src/Theme';

export type AppTextWeight = 'ultralight' | 'light' | 'thin' | 'regular' | 'medium' | 'semibold' | 'bold';

export type AppTextProps = TextProps & {
  color?: ThemeColor;
  align?: 'left' | 'center' | 'right';
  weight?: AppTextWeight;
  disabled?: boolean;
  opacity?: number;
  size?: number;
  baseStyle?: any;
  style?: TextStyle;
  onPress?: () => void;
};

const getFontFamily = (weight: AppTextWeight) => {
  switch (weight) {
    case 'ultralight':
      return 'SuisseIntl-UltraLight';
    case 'light':
      return 'SuisseIntl-Light';
    case 'thin':
      return 'SuisseIntl-Thin';
    case 'regular':
      return 'SuisseIntl-Regular';
    case 'medium':
      return 'SuisseIntl-Medium';
    case 'semibold':
      return 'SuisseIntl-SemiBold';
    case 'bold':
      return 'SuisseIntl-Bold';
    default:
      return 'SuisseIntl-Regular';
  }
};

/**
 * Base text component, **SuisseIntl** font family, with prop options for everything else.
 */
export const AppText: React.FC<React.PropsWithChildren<AppTextProps>> = ({
  color = 'black',
  align = 'left',
  weight = 'regular',
  size = 17,
  disabled = false,
  opacity,
  style,
  onPress,
  children,
  ...props
}) => {
  const family = getFontFamily(weight);
  const appColors = getAppColors();
  const baseStyles = useMemo(() => {
    const resolvedFamily = { fontFamily: family };
    // @ts-ignore
    const resolvedColor = color ? { color: appColors[color] } : undefined;
    const resolvedAlign = { textAlign: align };
    const resolvedOpacity = opacity ? { opacity } : undefined;
    const resolvedSize = { fontSize: size };

    return [
      resolvedFamily,
      resolvedColor,
      resolvedAlign,
      resolvedOpacity,
      resolvedSize,
      { letterSpacing: size >= 34 ? -0.68 : 0 },
      style ?? {},
    ];
  }, [family, color, align, opacity, size, style]);

  return (
    <Text style={[baseStyles]} onPress={onPress} disabled={disabled} {...props}>
      {children}
    </Text>
  );
};
