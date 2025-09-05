import { StyleSheet } from "react-native";
import { ThemeImplementation } from "./theme";
import { theme } from "./theme";

/**
 * Custom function to create a themed StyleSheet
 * @param stylesFn - A function that returns a themed StyleSheet
 * @returns A StyleSheet object with the theme object injected
 */
export function themedStyleSheet<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(
  stylesFn: (theme: ThemeImplementation) => T & StyleSheet.NamedStyles<any>
): T {
  return StyleSheet.create(stylesFn(theme));
}

export type ThemedStyleSheet = ReturnType<typeof themedStyleSheet>;
