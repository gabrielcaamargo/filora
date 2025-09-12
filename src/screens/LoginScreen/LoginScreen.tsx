import { FormTextInput, TextInput } from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthScreenProps } from "@routes";
import { themedStyleSheet } from "@theme";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import z from "zod";

const testSchema = z.object({
  email: z.string(),
});

type TestSchema = z.infer<typeof testSchema>;

export function LoginScreen({}: AuthScreenProps<"LoginScreen">) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const {
    control,
    formState: { errors },
  } = useForm<TestSchema>({
    resolver: zodResolver(testSchema),
    mode: "onChange",
    delayError: 500,
  });

  return (
    <View style={styles.container}>
      <FormTextInput
        name="email"
        control={control}
        placeholder="Email"
        label="Email"
        iconVariant="Feather"
        iconName={secureTextEntry ? "eye" : "eye-off"}
        errors={errors}
        onPressIcon={() => setSecureTextEntry((prev) => !prev)}
        secureTextEntry={secureTextEntry}
      />
      {/* <Icon variant="AntDesign" name="mail" color="primaryColor" /> */}
    </View>
  );
}

const styles = themedStyleSheet(({ spacing }) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.s20,
  },
}));
