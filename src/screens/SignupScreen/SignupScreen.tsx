import { FormTextInput, Screen, Button } from "@components";
import { themedStyleSheet } from "@theme";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { signupSchema, SignupSchema } from "./SignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { TestIds } from "@test";

export function SignupScreen() {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit: formSubmit,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    delayError: 500,
  });

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  function handleSubmit(data: SignupSchema) {
    console.log({ data });
  }

  return (
    <Screen canGoBack title="Criar conta">
      <View style={styles.formContainer}>
        <FormTextInput
          label="Nome"
          placeholder="Digite seu nome"
          control={control}
          name="firstName"
          errors={errors}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormTextInput
          control={control}
          name="lastName"
          errors={errors}
          placeholder="Digite seu sobrenome"
          label="Sobrenome"
        />

        <FormTextInput
          control={control}
          name="email"
          errors={errors}
          placeholder="Digite seu email"
          label="Email"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormTextInput
          control={control}
          name="password"
          errors={errors}
          placeholder="Digite seu sobrenome"
          label="Senha"
          secureTextEntry={secureTextEntry}
          onPressIcon={() => setSecureTextEntry((prev) => !prev)}
          iconName={secureTextEntry ? "eye-off" : "eye"}
          iconVariant="Feather"
        />

        <FormTextInput
          control={control}
          name="confirmPassword"
          errors={errors}
          placeholder="Digite sua senha"
          label="Confirmar senha"
          secureTextEntry
        />

        <Button
          title="Criar conta"
          onPress={formSubmit(handleSubmit)}
          disabled={!isValid}
        />

        <View style={styles.divider} />

        <Button
          title="Entrar com Google"
          preset="outline"
          testID={TestIds.GOOGLE_SOCIAL_BUTTON}
        />
        <Button
          title="Entrar com Apple"
          preset="outline"
          testID={TestIds.APPLE_SOCIAL_BUTTON}
        />
      </View>
    </Screen>
  );
}

const styles = themedStyleSheet(({ spacing, colors }) => ({
  formContainer: {
    gap: spacing.s16,
  },

  divider: {
    height: 1,
    backgroundColor: colors.grayLight,
    width: "100%",
    marginVertical: spacing.s2,
  },

  socialButtons: {},
}));
