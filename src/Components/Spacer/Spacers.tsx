import React from 'react';
import {Platform, View} from 'react-native';
import {Theme} from '../../Theme';

type Props = {
  /**
   * Direction for the spacer component
   */
  horizontal?: boolean;
  /**
   * Size as a factor of UxUnit defined in Theme. Default is 4
   */
  size?: number;
};

export const Spacer: React.FC<Props> = ({size = 4, horizontal = false}) => {
  return <View style={horizontal ? {width: Theme.UxUnit * size} : {height: Theme.UxUnit * size}} />;
};

export const HorizontalSpacer: React.FC<Pick<Props, 'size'>> = ({size}) => (
  <Spacer size={size} horizontal />
);

export const AndroidSpacer: React.FC<Props> = ({...props}) =>
  Platform.OS === 'android' ? <Spacer {...props} /> : null;
