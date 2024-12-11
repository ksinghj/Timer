import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from './RootNavigator';
import { NavigationContainer } from '@react-navigation/native';

/**
 * Main app container, which wraps the entire app in a navigation container
 */
export const AppContainer: React.FC = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <BottomSheetModalProvider>
            <>
              <StatusBar barStyle="light-content" />
              <RootNavigator />
            </>
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });
