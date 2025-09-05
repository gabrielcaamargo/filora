import { palette } from "./themeColors";
import { radius } from "./themeRadius";
import { spacing } from "./themeSpacing";

export type ThemeImplementation = {
  colors: Record<string, string>;
  radius: Record<string, number>;
  spacing: Record<string, number>;
};

export const theme: ThemeImplementation = {
  colors: palette,
  radius,
  spacing,
};
