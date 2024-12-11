import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getAppColors, ThemeColor } from '../../Theme';

type Props = {
  mode?: 'top' | 'bottom';
  backgroundColor?: ThemeColor;
};

/**
 * Renders a spacer that is the height of the safe area insets, either top or bottom
 * depending on the mode property
 */
export const SafeAreaSpacer: React.FC<Props> = ({ backgroundColor, mode = 'bottom' }) => {
  const appColors = getAppColors();
  const insets = useSafeAreaInsets();
  const style = useMemo(
    () => ({
      height: mode === 'bottom' ? insets.bottom : insets.top,
      backgroundColor: backgroundColor ? appColors[backgroundColor] : undefined,
    }),
    [backgroundColor, appColors, insets.bottom, insets.top, mode]
  );
  return <View style={style} />;
};
