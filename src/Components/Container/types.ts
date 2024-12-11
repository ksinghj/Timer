import {FlexAlignType, TouchableWithoutFeedbackProps, ViewProps, ViewStyle} from 'react-native';
import {ThemeColor} from '../../Theme';
import {
  AnimatedRef,
  BaseAnimationBuilder,
  EntryExitAnimationFunction,
  Keyframe,
  LayoutAnimationFunction,
} from 'react-native-reanimated';

export type ContainerProps = {
  /**
   * Overridden style - will be applied at the end of the style chain
   */
  style?: ViewStyle;
  /**
   * Themed color name for the container
   */
  backgroundColor?: ThemeColor;
  /**
   * Opacity for the background color
   */
  backgroundColorOpacity?: string | number;
  /**
   * Sets alignItems
   */
  align?: FlexAlignType;
  /**
   * Sets justifyContent
   */
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  /**
   * Sets alignSelf
   */
  alignSelf?: FlexAlignType;
  /**
   * Sets the padding for the container
   */
  padding?: number;
  /**
   * Sets the horizontal padding for the container
   */
  paddingHorizontal?: number;
  /**
   * Sets the vertical padding for the container
   */
  paddingVertical?: number;
  /**
   * Flex value
   */
  flex?: number;
  /**
   * Set to true to render as regular scrollview.
   */
  scrollable?: boolean;
  /**
   * Renders a scrollview that allows for scrolling in nested bottom sheets.
   * Only works if scrollable is set to true as well.
   * Will throw error if used outside of a bottom sheet.
   */
  overScroll?: boolean;
  /**
   * When false prevents overscrolling (true by default)
   * Only works if scrollable is set to true as well.
   */
  nestedSheetScroll?: boolean;
  /**
   * Flex direction is row
   */
  horizontal?: boolean;
  /**
   * Shorthan to center content in the container,
   * i.e. justifyContent and alignItems are set to center.
   * left, right, top, bottom, spaceBetween overrides center.
   */
  wrap?: boolean;
  /**
   * Should the container wrap its content
   * (only works for horizontal layout)
   */
  center?: true;
  /**
   * Shorthand to left align content in the container,
   * overriding center and spaceBetween (horizontal)),
   * .i.e. when vertical layout alignItems flex-start is used,
   * when horizontal layout justifyContent flex-start is used.
   */
  left?: true;
  /**
   * Shorthand to right align content in the container,
   * overriding center and spaceBetween (horizontal)),
   * .i.e. when vertical layout alignItems flex-end is used,
   * when horizontal layout justifyContent flex-end is used.
   */
  right?: true;
  /**
   * Shorthand to top align content in the container,
   * overriding center and spaceBetween (vertical)),
   * .i.e. when vertical layout justifyContent flex-start is used,
   * when horizontal layout alignItems flex-start is used.
   */
  top?: true;
  /**
   * Shorthand to bottom align content in the container,
   * overriding center and spaceBetween (vertical)),
   * .i.e. when vertical layout justifyContent flex-end is used,
   * when horizontal layout alignItems flex-end is used.
   */
  bottom?: true;
  /**
   * Shorthand to justify content to space between in layout direction,
   * left, right and top, bottom overrides spaceBetween for
   * horizontal and vertical layout, respectively.
   */
  spaceBetween?: true;
  /*
  Height in pixels or percentage - not theme units
  */
  height?: number | string;
  /*
  Width in pixels or percentage - not theme units
  */
  width?: number | string;
  /**
   * Set to true to render default borders
   */
  borders?: boolean;
  /**
   * Set to render a container with rounded corners.
   */
  rounded?: boolean;
  /**
   * Set to render a container with small rounded corners (half the regular rounding for small objects).
   */
  smallRounded?: boolean;
  /**
   * Set to render a container with full rounded corners.
   */
  roundedFull?: boolean;
  /**
   * Set to render a container with a specific corner radius. Overrides rounded.
   */
  cornerRadius?: number;
  /**
   * Renders a keyboard avoiding view as the container
   */
  keyboard?: boolean;
  /**
   * Hides scrollbars when rendered in scrollable mode
   */
  hideScrollbars?: boolean;
  /**
   * Flag for container be scrollable, default to true. Only applicable when scrollable is true.
   * Usually only used to disable scrolling, by explicitly setting to false.
   */
  scrollEnabled?: boolean;
  /**
   * Set to true to render a container with absolute positioning
   */
  absolute?: boolean;
  /**
   * Opacity for the container
   */
  opacity?: number;
  /**
   * Overflow setting for the view
   */
  overflow?: 'scroll' | 'hidden' | 'visible';
  /**
   * Shortcut for adding a shadow on the view
   */
  shadow?: boolean;
  /**
   * Sets custom border width, defaults to StyleSheet.hairlineWidth
   */
  borderWidth?: number;
  /**
   * Custom border color
   */
  borderColor?: ThemeColor;
  /**
   * Layout animation - if set it will render as an animated view with animation.
   * Works with pressable and view, not in scrollable or keyboard mode.
   */
  layout?: BaseAnimationBuilder | LayoutAnimationFunction | typeof BaseAnimationBuilder;
  /**
   * Layout animation - if set it will render as an animated view with animation.
   */
  entering?: BaseAnimationBuilder | typeof BaseAnimationBuilder | EntryExitAnimationFunction;
  /**
   * Layout animation - if set it will render as an animated view with animation.
   */
  exiting?: BaseAnimationBuilder | typeof BaseAnimationBuilder | EntryExitAnimationFunction;
  /**
   * Optional callback for when the container is pressed in. Renders
   * a TouchableOpacity if set.
   */
  onPressIn?: () => void;
  /**
   * Optional callback for when the container is pressed. Renders
   * a TouchableOpacity if set.
   */
  onPress?: () => void;
  /**
   * Optional callback for when the container is pressed out.
   */
  onPressOut?: () => void;
  /**
   * Optional callback for when the container is long pressed.
   */
  disabled?: boolean;
  /**
   * If the button is disabled (only applies when pressable)
   */
  onLongPress?: () => void;
  /**
   * Optional callback for when the container is touched.
   */
  onTouchStart?: () => void;
  /**
   * This defines how far your touch can start away from the component.
   * This is added to pressRetentionOffset when moving off of the component.
   * NOTE The touch area never extends past the parent view bounds and
   * the Z-index of sibling views always takes precedence if a touch hits
   * two overlapping views.
   * NOTE Only applicable when onPress is set.
   */
  hitSlop?: TouchableWithoutFeedbackProps['hitSlop'];

  ref?: AnimatedRef<any>;

  /**
   * Pointer events for the container
   */
  pointerEvents?: ViewProps['pointerEvents'];

  /**
   * Whether to render a TouchableHighlight
   */
  touchableHighlight?: boolean;

  /**
   * Underlay color for TouchableHighlight
   * Requires touchableHighlight to be set to true
   */
  underlayColor?: string;
};
