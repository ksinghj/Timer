import type { StackScreenProps } from '@react-navigation/stack';

/**
 * Defines the screens/parameters for the root navigation stack.
 */
export type RootStackParamList = {
  Home: undefined;
} & ModalsParamList;

/**
 * Defines the screens/parameters for the modals navigation stack.
 */
export type ModalsParamList = {
  CreateTimer: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;
