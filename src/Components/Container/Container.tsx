import React, {useMemo} from 'react';
import Animated from 'react-native-reanimated';
import {
  StyleSheet,
  View,
  ViewStyle,
  ScrollView,
  ScrollViewProps,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAvoidingView} from './ReaKeyboardAvoidingView';
import {Theme, useAppColours} from '../../Theme';
import {ContainerProps} from './types';
import {colorWithOpacity} from '../../Services';
// import {TouchableOpacity} from 'react-native-gesture-handler';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  backgroundColor,
  backgroundColorOpacity,
  horizontal,
  borders = false,
  rounded = false,
  smallRounded = false,
  roundedFull = false,
  borderColor = 'main',
  borderWidth = StyleSheet.hairlineWidth,
  cornerRadius,
  style: baseStyle = {},
  padding,
  paddingHorizontal,
  paddingVertical,
  hideScrollbars = false,
  scrollEnabled = true,
  layout,
  entering,
  exiting,
  flex,
  align,
  justify,
  alignSelf,
  height,
  width,
  left,
  right,
  top,
  bottom,
  center,
  spaceBetween,
  scrollable = false,
  nestedSheetScroll = false,
  keyboard = false,
  absolute = false,
  overflow,
  opacity,
  shadow,
  onPress,
  onPressIn,
  onPressOut,
  onLongPress,
  hitSlop,
  children,
  wrap,
  pointerEvents,
  touchableHighlight,
  underlayColor,
}) => {
  const insets = useSafeAreaInsets();
  const appColors = useAppColours();

  const alignmentStyle = useMemo(() => {
    const horAlignment = left ? 'flex-start' : right ? 'flex-end' : undefined;
    const vertAlignment = top ? 'flex-start' : bottom ? 'flex-end' : undefined;
    return horizontal
      ? {
          alignItems: vertAlignment ?? (center ? 'center' : undefined),
          justifyContent:
            horAlignment ?? (spaceBetween ? 'space-between' : center ? 'center' : undefined),
          flexDirection: 'row' as const,
          flexWrap: wrap ? 'wrap' : undefined,
        }
      : {
          alignItems: horAlignment ?? (center ? 'center' : undefined),
          justifyContent:
            vertAlignment ?? (spaceBetween ? 'space-between' : center ? 'center' : undefined),
          flexDirection: 'column' as const,
        };
  }, [bottom, center, horizontal, left, right, spaceBetween, top, wrap]);

  const style = useMemo(
    () =>
      ({
        ...alignmentStyle,
        ...(paddingVertical !== undefined && !scrollable
          ? {paddingVertical: Theme.UxUnit * paddingVertical}
          : {}),
        ...(paddingHorizontal !== undefined && !scrollable
          ? {paddingHorizontal: Theme.UxUnit * paddingHorizontal}
          : {}),
        ...(padding !== undefined && !scrollable ? {padding: Theme.UxUnit * padding} : {}),
        ...(backgroundColor
          ? {
              backgroundColor: colorWithOpacity(appColors[backgroundColor], backgroundColorOpacity),
            }
          : {}),
        ...(align ? {alignItems: align} : {}),
        ...(justify ? {justifyContent: justify} : {}),
        ...(flex ? {flex} : {}),
        ...(alignSelf ? {alignSelf} : {}),
        ...(width !== undefined ? {width} : {}),
        ...(height !== undefined ? {height} : {}),
        ...(borders ? {borderWidth, borderColor: appColors[borderColor]} : {}),
        ...(rounded ? {borderRadius: Theme.Radius.Large} : {}),
        ...{borderCurve: 'continuous'},
        ...(smallRounded ? {borderRadius: 12} : {}),
        ...(roundedFull ? {borderRadius: 50} : {}),
        ...(cornerRadius ? {borderRadius: cornerRadius * Theme.UxUnit} : {}),
        ...(absolute ? StyleSheet.absoluteFillObject : {}),
        ...(opacity !== undefined ? {opacity} : {}),
        ...(overflow !== undefined ? {overflow} : {}),
        ...(shadow
          ? {
              shadowColor: appColors.black,
              shadowOpacity: Theme.DisabledOpacity,
              shadowOffset: {width: Theme.UxUnit, height: Theme.UxUnit * 2},
              shadowRadius: Theme.UxUnit * 6,
            }
          : {}),
        ...(pointerEvents ? {pointerEvents} : {}),
        ...baseStyle,
      }) as ViewStyle,
    [
      alignmentStyle,
      paddingVertical,
      scrollable,
      paddingHorizontal,
      padding,
      backgroundColor,
      backgroundColorOpacity,
      align,
      justify,
      flex,
      alignSelf,
      width,
      height,
      borders,
      borderWidth,
      borderColor,
      rounded,
      smallRounded,
      roundedFull,
      cornerRadius,
      absolute,
      opacity,
      overflow,
      shadow,
      baseStyle,
      pointerEvents,
    ],
  );

  const contentContainerStyle = useMemo(
    () => ({
      ...(paddingVertical !== undefined ? {paddingVertical: Theme.UxUnit * paddingVertical} : {}),
      ...(paddingHorizontal !== undefined
        ? {paddingHorizontal: Theme.UxUnit * paddingHorizontal}
        : {}),
      ...(padding !== undefined ? {padding: Theme.UxUnit * padding} : {}),
    }),
    [padding, paddingHorizontal, paddingVertical],
  );

  const scrollViewProps = useMemo(
    () => ({
      alwaysBounceHorizontal: false,
      showsHorizontalScrollIndicator: !hideScrollbars,
      showsVerticalScrollIndicator: !hideScrollbars,
      keyboardShouldPersistTaps: 'handled' as ScrollViewProps['keyboardShouldPersistTaps'],
      contentContainerStyle: contentContainerStyle,
      horizontal: horizontal,
      style: style,
      scrollEnabled,
    }),
    [hideScrollbars, horizontal, style, contentContainerStyle, scrollEnabled],
  );

  const renderScrollView = () => {
    return nestedSheetScroll ? (
      <BottomSheetScrollView {...scrollViewProps}>{children}</BottomSheetScrollView>
    ) : (
      // normal scroll view for when not used in a sheet
      <ScrollView {...scrollViewProps}>{children}</ScrollView>
    );
  };

  const isAnimated = entering || exiting || layout;

  return onPress || onPressIn || onPressOut || onLongPress || touchableHighlight ? (
    layout ? (
      <AnimatedTouchableOpacity
        layout={layout}
        entering={entering}
        exiting={exiting}
        style={style}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        hitSlop={hitSlop}>
        {children}
      </AnimatedTouchableOpacity>
    ) : touchableHighlight ? (
      <TouchableHighlight
        underlayColor={underlayColor}
        style={style}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        hitSlop={hitSlop}>
        <>{children}</>
      </TouchableHighlight>
    ) : (
      <TouchableOpacity
        style={style}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        hitSlop={hitSlop}>
        {children}
      </TouchableOpacity>
    )
  ) : scrollable ? (
    renderScrollView()
  ) : keyboard ? (
    <KeyboardAvoidingView
      style={style}
      keyboardVerticalOffset={insets.bottom}
      enabled
      behavior="padding">
      {children}
    </KeyboardAvoidingView>
  ) : isAnimated ? (
    <Animated.View
      style={style}
      layout={layout}
      entering={entering}
      exiting={exiting}
      pointerEvents={pointerEvents}>
      {children}
    </Animated.View>
  ) : (
    <View style={style} pointerEvents={pointerEvents}>
      {children}
    </View>
  );
};
