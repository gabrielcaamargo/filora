import { StyleSheet } from "react-native";
import { ThemeImplementation } from "./theme";
import { theme } from "./theme";

export function themedStyleSheet<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(
  stylesFn: (theme: ThemeImplementation) => T & StyleSheet.NamedStyles<any>
): T {
  return StyleSheet.create(stylesFn(theme));
}
