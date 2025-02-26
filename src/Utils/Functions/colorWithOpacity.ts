import {isNullOrUndefined} from './isNullOrUndefined';

/**
 * Make color with opacity by appending hex opactiy to hex color
 * @param hexColor
 * @param opacity float value between 0 and 1 or hex string between 00 and FF
 * @returns
 */
export const colorWithOpacity = (
  hexColor?: string,
  opacity?: number | string,
): string | undefined => {
  const hexOpacity =
    typeof opacity === 'string'
      ? opacity
      : typeof opacity === 'number'
        ? Math.max(Math.min(Math.round(opacity * 255), 255), 0).toString(16)
        : undefined;
  return hexColor && !isNullOrUndefined(hexOpacity) ? `${hexColor}${hexOpacity}` : hexColor;
};
