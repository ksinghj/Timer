const BaseColors = {
  green: '#1FFF2E',
  main: '#009DFF',
  backgroundPrimary: '#000000',
  backgroundSecondary: '#0B0B0B',
  black: '#000000',
  white: '#FFFFFF',
};

type IBaseColors = typeof BaseColors;
export type IBaseColor = keyof IBaseColors;

export const withOpacity = (color: IBaseColor | string, opacity: number) => {
  const colorValue = BaseColors[color as IBaseColor] || color;
  const opacityValue = Math.floor(opacity * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();

  if (!BaseColors[color as IBaseColor]) {
    return color + opacityValue;
  }

  return colorValue + opacityValue;
};

export const Colors = {
  ...BaseColors,
  green20: withOpacity('green', 0.2),
  main20: withOpacity('main', 0.2),
};

export type IColors = typeof Colors;
export type IColor = keyof IColors;

export type ThemeColor = IColor;

export const getAppColors = (): Record<IColor, string> => {
  return Colors as Record<IColor, string>;
};
