import React from 'react';
import {Container} from '../Container';
import {Theme, ThemeColor} from '../../Theme';
import {SafeAreaSpacer, Spacer} from '../Spacer';

export type AppScreenProps = {
  mode?: 'keyboard' | 'scrollable';
  hideScrollbars?: boolean;
  topSafeArea?: boolean;
  bottomSafeArea?: boolean;
  fullWidth?: boolean;
  backgroundColor?: ThemeColor;
  header?: React.ReactElement | null;
  headerBgColor?: ThemeColor;
  footer?: React.ReactElement | null;
  hasTopPadding?: boolean;
  hasBottomPadding?: boolean;
  topHandle?: boolean;
  rounded?: boolean;
};

export const AppScreen: React.FC<React.PropsWithChildren<AppScreenProps>> = ({
  backgroundColor = 'backgroundPrimary',
  hideScrollbars = false,
  topSafeArea = false,
  bottomSafeArea = true,
  hasTopPadding = true,
  hasBottomPadding = false,
  fullWidth = false,
  mode = 'default',
  header,
  footer,
  headerBgColor,
  children,
  topHandle = false,
  rounded = false,
}) => {
  return (
    <Container
      flex={1}
      keyboard={mode === 'keyboard'}
      backgroundColor={backgroundColor}
      rounded={rounded}>
      {/** Top spacer - hasTopPadding */}
      {topSafeArea ? <SafeAreaSpacer mode="top" /> : null}
      {hasTopPadding ? <Spacer /> : null}
      {topHandle ? (
        <Container center alignSelf="center">
          <Spacer size={2} />
          <Container width={40} height={4} backgroundColor="sheetHandle" roundedFull />
          <Spacer size={2} />
        </Container>
      ) : null}
      {/** Header? */}
      {header ? <Container backgroundColor={headerBgColor}>{header}</Container> : null}
      {/** Content */}
      <Container
        scrollable={mode === 'scrollable'}
        style={{overflow: 'visible'}}
        hideScrollbars={hideScrollbars}
        flex={1}
        paddingHorizontal={fullWidth ? 0 : Theme.DefaultPadding}>
        {children}
        {/** Add some bottom spacing  */}
        {hasBottomPadding ? <Spacer size={4} /> : null}
      </Container>
      {/** Footer */}
      {footer ? footer : null}
      {hasBottomPadding ? <Spacer size={8} /> : null}
      {bottomSafeArea ? <SafeAreaSpacer mode="bottom" /> : null}
    </Container>
  );
};
