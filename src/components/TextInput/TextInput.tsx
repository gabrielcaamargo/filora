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

interface TextInputProps extends RNTextInputProps {
  label?: string;
  disabled?: boolean;
}

export function TextInput({
  label,
  disabled = false,
  ...textInputProps
}: TextInputProps) {
  const inputRef = useRef<RNTextInput>(null);

  function handleFocus() {
    inputRef.current?.focus();
  }

  return (
    <Pressable
      onPress={handleFocus}
      disabled={disabled}
      testID={TestIds.TEXT_INPUT_CONTAINER}
    >
      <View style={styles.container}>
        {label && <Text testID={TestIds.TEXT_INPUT_LABEL}>{label}</Text>}

        <RNTextInput
          ref={inputRef}
          testID={TestIds.TEXT_INPUT}
          style={[styles.inputContainer, disabled && styles.disabledInput]}
          {...textInputProps}
        />
      </View>
    </Pressable>
  );
}

const styles = themedStyleSheet(({ colors, spacing, radius }) => ({
  container: {
    gap: spacing.s8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.grayLight,
    borderRadius: radius.s8,
    paddingHorizontal: spacing.s16,
    paddingVertical: spacing.s12,
  },

  disabledInput: {
    backgroundColor: colors.grayLight,
  },
}));
