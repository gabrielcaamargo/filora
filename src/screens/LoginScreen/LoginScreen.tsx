import { Button, Text, TextInput } from "@components";
import { useAppSafeArea } from "@hooks";
import { AuthScreenProps } from "@routes";
import { themedStyleSheet } from "@theme";
import { Dimensions, Image, View, ScrollView } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";

export function LoginScreen({}: AuthScreenProps<"LoginScreen">) {
  const { top } = useAppSafeArea();

  function handleSocialLogin(provider: "google" | "apple") {
    // TODO: Implement social login
    console.log(provider);
  }

  return (
    <KeyboardStickyView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
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
            <TextInput label="Email" placeholder="Digite seu email" />

            <TextInput label="Senha" placeholder="Digite sua senha" />

            <Button title="Entrar" />

            <View style={styles.divider} />

            <View style={styles.socialButtons}>
              <Button
                title="Entrar com Google"
                preset="outline"
                onPress={() => handleSocialLogin("google")}
              />
              <Button
                title="Entrar com Apple"
                preset="outline"
                onPress={() => handleSocialLogin("apple")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardStickyView>
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
    marginTop: spacing.s20,
    gap: spacing.s16,
  },

  divider: {
    height: 1,
    backgroundColor: colors.grayLight,
    width: "100%",
    marginVertical: spacing.s8,
  },

  socialButtons: {
    gap: spacing.s8,
    marginTop: spacing.s8,
  },
}));
