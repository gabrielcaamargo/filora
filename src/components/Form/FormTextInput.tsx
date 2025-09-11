import {
  Controller,
  UseControllerProps,
  FieldValues,
  FormState,
} from "react-hook-form";

import { Text, TextInput, TextInputProps } from "@components";
import { View } from "react-native";
import { themedStyleSheet } from "@theme";

export function FormTextInput<FormType extends FieldValues>({
  control,
  name,
  rules,
  errors,
  ...textInputProps
}: TextInputProps &
  UseControllerProps<FormType> &
  Partial<FormState<FormType>> & { errorMessage?: string }) {
  const errorMessage = errors?.[name]?.message ?? "";

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <View style={styles.wrapper}>
          <TextInput
            value={field.value}
            onChangeText={field.onChange}
            {...textInputProps}
          />
          {errorMessage && (
            <Text preset="paragraphCaption" color="redMain">
              {errorMessage as string}
            </Text>
          )}
        </View>
      )}
    />
  );
}

const styles = themedStyleSheet(({ spacing }) => ({
  wrapper: {
    gap: spacing.s4,
    width: "100%",
  },
}));
