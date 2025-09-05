import { palette } from "./colors";
import { radius } from "./radius";
import { spacing } from "./spacing";

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
