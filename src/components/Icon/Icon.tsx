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
import { TestIds } from "@test";
import { memo } from "react";
import { Pressable } from "react-native";

interface IconProps {
  variant: IconVariant;
  name: string;
  size?: number;
  color?: ThemeColors;
  onPressIcon?: () => void;
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
  onPressIcon,
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

  return (
    <Pressable
      testID={TestIds.ICON_CONTAINER}
      onPress={onPressIcon}
      hitSlop={12}
    >
      <IconComponent
        name={name}
        size={size}
        color={iconColor}
        testID={TestIds.ICON}
      />
    </Pressable>
  );
}
