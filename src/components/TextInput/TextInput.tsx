import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from "react-native";
import { Text } from "../Text/Text";
import { TestIds } from "@test";
import { themedStyleSheet } from "@theme";
import { useRef } from "react";
import { IconVariant } from "../Icon/icon.types";
import { Icon } from "../Icon/Icon";
import { useTheme } from "@hooks";

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  disabled?: boolean;
  iconName?: string;
  iconVariant?: IconVariant;
  onPressIcon?: () => void;
}

export function TextInput({
  label,
  disabled = false,
  iconVariant,
  iconName,
  onPressIcon,
  ...textInputProps
}: TextInputProps) {
  const inputRef = useRef<RNTextInput>(null);
  const {
    theme: { colors },
  } = useTheme();
  function handleFocus() {
    inputRef.current?.focus();
  }

  return (
    <Pressable
      onPress={handleFocus}
      disabled={disabled}
      testID={TestIds.TEXT_INPUT_CONTAINER}
      style={styles.wrapper}
    >
      <View style={styles.container}>
        {label && <Text testID={TestIds.TEXT_INPUT_LABEL}>{label}</Text>}

        <View style={[styles.inputContainer, disabled && styles.disabledInput]}>
          <RNTextInput
            ref={inputRef}
            testID={TestIds.TEXT_INPUT}
            placeholderTextColor={colors.grayMain}
            editable={!disabled}
            style={styles.input}
            {...textInputProps}
          />

          {iconVariant && iconName && (
            <Icon
              variant={iconVariant}
              name={iconName}
              color={disabled ? "grayMain" : "textColor"}
              onPressIcon={onPressIcon}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = themedStyleSheet(({ colors, spacing, radius }) => ({
  wrapper: {
    width: "100%",
  },

  container: {
    gap: spacing.s8,
  },

  inputContainer: {
    borderWidth: 1,
    borderColor: colors.grayMain,
    borderRadius: radius.s8,
    paddingHorizontal: spacing.s16,
    paddingVertical: spacing.s12,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    flex: 1,
  },

  disabledInput: {
    backgroundColor: colors.grayLight,
  },
}));
