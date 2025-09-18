import { ThemedStyleSheet, themedStyleSheet } from "@theme";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Text } from "../Text/Text";
import { TestIds } from "@test";

type ButtonPreset = "default" | "outline";

interface ButtonProps extends TouchableOpacityProps {
  preset?: ButtonPreset;
  title: string;
}

const buttonPresets: Record<ButtonPreset, ThemedStyleSheet> = {
  default: themedStyleSheet(({ colors }) => ({
    container: {
      backgroundColor: colors.primaryColor,
    },

    title: {
      color: colors.white,
    },

    disabled: {
      backgroundColor: colors.grayLight,
    },

    disabledTitle: {
      color: colors.grayMain,
    },
  })),
  outline: themedStyleSheet(({ colors }) => ({
    container: {
      backgroundColor: colors.transparent,
      borderWidth: 1,
      borderColor: colors.primaryColor,
    },

    title: {
      color: colors.primaryColor,
    },

    disabled: {
      backgroundColor: colors.grayLight,
      borderColor: colors.grayLight,
    },

    disabledTitle: {
      color: colors.grayMain,
    },
  })),
};

export function Button({
  preset = "default",
  title,
  style,
  ...props
}: ButtonProps) {
  const styles = buttonPresets[preset];

  return (
    <TouchableOpacity
      style={[
        defaultStyles.container,
        styles.container,
        style,
        props.disabled && styles.disabled,
      ]}
      testID={TestIds.BUTTON}
      {...props}
    >
      <Text
        weight="Medium"
        style={[styles.title, props.disabled && styles.disabledTitle]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const defaultStyles = themedStyleSheet(({ spacing, radius }) => ({
  container: {
    borderRadius: radius.s8,
    paddingHorizontal: spacing.s16,
    paddingVertical: spacing.s8,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
  },
}));
