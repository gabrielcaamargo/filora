import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";
import { IconVariant } from "./icon.types";
import { ThemeColors } from "@theme";
import { useTheme } from "@hooks";

interface IconProps {
  variant: IconVariant;
  name: string;
  size?: number;
  color?: ThemeColors;
}

const iconVariants = {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
};

export function Icon({
  color = "textColor",
  name,
  variant,
  size = 20,
}: IconProps) {
  const IconComponent = iconVariants[variant];
  const theme = useTheme();
  const iconColor = theme.palette[color];

  if (!IconComponent) {
    console.warn(`Icon variant ${variant} not found`);
    return null;
  }

  return <IconComponent name={name} size={size} color={iconColor} />;
}
