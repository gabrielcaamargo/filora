import { useTheme } from "@hooks";
import { ThemeColors } from "@theme";
import {
  TextStyle,
  TextProps as RNTextProps,
  Text as RNText,
} from "react-native";

type TextPresets =
  | "headingLarge"
  | "headingMedium"
  | "headingSmall"
  | "paragraphLarge"
  | "paragraphMedium"
  | "paragraphSmall"
  | "paragraphCaption"
  | "paragraphCaptionSmall";

type FontWeight = "Regular" | "Medium" | "SemiBold" | "Bold";

const $fontSizes: Record<
  TextPresets,
  Pick<TextStyle, "fontSize" | "lineHeight">
> = {
  headingLarge: { fontSize: 32, lineHeight: 38.4 },
  headingMedium: { fontSize: 22, lineHeight: 26.4 },
  headingSmall: { fontSize: 18, lineHeight: 23.4 },

  paragraphLarge: { fontSize: 18, lineHeight: 25.2 },
  paragraphMedium: { fontSize: 16, lineHeight: 22.4 },
  paragraphSmall: { fontSize: 14, lineHeight: 19.6 },

  paragraphCaption: { fontSize: 12, lineHeight: 16.8 },
  paragraphCaptionSmall: { fontSize: 10, lineHeight: 14 },
};

const fontWeightMapper: Record<FontWeight, string> = {
  Regular: "Inter_400Regular",
  Medium: "Inter_500Medium",
  SemiBold: "Inter_600SemiBold",
  Bold: "Inter_700Bold",
};

interface TextProps extends RNTextProps {
  preset?: TextPresets;
  weight?: FontWeight;
  color?: ThemeColors;
}

export function Text({
  preset = "paragraphMedium",
  weight = "Regular",
  color = "textColor",
  style,
  ...props
}: TextProps) {
  const theme = useTheme();
  const fontFamily = fontWeightMapper[weight];
  const fontSize = $fontSizes[preset].fontSize;
  const lineHeight = $fontSizes[preset].lineHeight;

  return (
    <RNText
      {...props}
      style={[
        { fontFamily, color: theme.palette[color], fontSize, lineHeight },
        style,
      ]}
    />
  );
}
