const colors = {
  emeraldDark: "#047857",
  emeraldMain: "#10b981",
  emeraldLight: "#6ee7b7",

  orangeDark: "#c2410c",
  orangeMain: "#f97316",
  orangeLight: "#fb923c",

  yellowMain: "#facc15",
  redMain: "#ef4444",
  greenMain: "#22c55e",
  grayDarkest: "#111827",
  grayDarker: "#171717",
  grayDark: "#262626",
  grayMain: "#737373",
  grayLight: "#d4d4d4",

  white: "#ffffff",
  black: "#000000",
};

export const palette = {
  ...colors,
  primaryColor: colors.emeraldMain,
  secondaryColor: colors.orangeMain,

  textColor: colors.white,
  backgroundColor: colors.grayDarkest,

  error: colors.redMain,
  success: colors.greenMain,
  warning: colors.yellowMain,
};

export type Theme = typeof palette;
export type ThemeColors = keyof Theme;
