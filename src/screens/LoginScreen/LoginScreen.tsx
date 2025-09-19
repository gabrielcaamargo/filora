import { Button, FormTextInput, Screen, Text } from "@components";
import { useAppSafeArea } from "@hooks";
import { AuthScreenProps } from "@routes";
import { themedStyleSheet } from "@theme";
import { useForm } from "react-hook-form";
import {
  Dimensions,
  Image,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { loginSchema, LoginSchema } from "./LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { TestIds } from "@test";

export function LoginScreen({}: AuthScreenProps<"LoginScreen">) {
  const { top } = useAppSafeArea();

  const {
    control,
    handleSubmit: formSubmit,
    formState: { isValid, errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    delayError: 500,
  });

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  function handleSocialLogin(provider: "google" | "apple") {
    // TODO: Implement social login
    console.log(provider);
  }

  function handleSubmit(data: LoginSchema) {
    console.log(data);
  }

  return (
    <Screen withHorizontalPadding={false} hasVerticalInsets={false} scrollable>
      <View style={[styles.imageContainer, { paddingTop: top }]}>
        <Image
          source={require("@assets/login-image.png")}
          width={100}
          height={100}
          style={styles.image}
        />
      </View>

      <View style={styles.formWrapper}>
        <Text preset="headingLarge" weight="Bold" color="primaryColor">
          Entrar
        </Text>

        <View style={styles.formContainer}>
          <FormTextInput
            label="Email"
            placeholder="Digite seu email"
            control={control}
            name="email"
            errors={errors}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <FormTextInput
            label="Senha"
            placeholder="Digite sua senha"
            control={control}
            name="password"
            errors={errors}
            secureTextEntry={secureTextEntry}
            onPressIcon={() => setSecureTextEntry((prev) => !prev)}
            iconName={secureTextEntry ? "eye-off" : "eye"}
            iconVariant="Feather"
          />

          <Button
            title="Entrar"
            testID={TestIds.LOGIN_BUTTON}
            onPress={formSubmit(handleSubmit)}
            disabled={!isValid}
          />

          <View style={styles.divider} />

          <View style={styles.socialButtons}>
            <Button
              title="Entrar com Google"
              preset="outline"
              onPress={() => handleSocialLogin("google")}
              testID={TestIds.GOOGLE_SOCIAL_BUTTON}
            />
            <Button
              title="Entrar com Apple"
              preset="outline"
              onPress={() => handleSocialLogin("apple")}
              testID={TestIds.APPLE_SOCIAL_BUTTON}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.createAccountButton}>
          <Text weight="Medium" color="grayDarker" preset="paragraphSmall">
            Ainda não tem conta? Crie uma agora mesmo
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = themedStyleSheet(({ colors, spacing }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: spacing.s20,
  },

  imageContainer: {
    backgroundColor: colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: Dimensions.get("screen").width,
    height: 280,
    resizeMode: "cover",
  },

  formWrapper: {
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: spacing.s20,
    paddingTop: spacing.s24,
    paddingBottom: spacing.s20,
    gap: spacing.s8,
  },

  formContainer: {
    marginTop: spacing.s12,
    gap: spacing.s16,
  },

  divider: {
    height: 1,
    backgroundColor: colors.grayLight,
    width: "100%",
    marginVertical: spacing.s2,
  },

  socialButtons: {
    gap: spacing.s8,
    marginTop: spacing.s8,
  },

  createAccountButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.s8,
  },

  createAccountButtonText: {
    textDecorationLine: "underline",
    textDecorationColor: colors.primaryColor,
  },
}));
