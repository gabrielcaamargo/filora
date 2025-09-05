import { palette, Theme } from "./colors";
import { radius, ThemeRadius } from "./radius";
import { spacing, ThemeSpacing } from "./spacing";

export type ThemeImplementation = {
  colors: Theme;
  radius: ThemeRadius;
  spacing: ThemeSpacing;
};

export const theme: ThemeImplementation = {
  colors: palette,
  radius,
  spacing,
};
