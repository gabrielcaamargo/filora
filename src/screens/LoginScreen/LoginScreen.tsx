import { Button, FormTextInput, Text, TextInput } from "@components";
import { useAppSafeArea } from "@hooks";
import { AuthScreenProps } from "@routes";
import { themedStyleSheet } from "@theme";
import { Dimensions, Image, View } from "react-native";
export function LoginScreen({}: AuthScreenProps<"LoginScreen">) {
  const { top } = useAppSafeArea();

  return (
    <View style={styles.container}>
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
          <TextInput
            label="Email"
            // name="email"
            placeholder="Digite seu email"
          />

          <TextInput
            label="Senha"
            // name="email"
            placeholder="Digite sua senha"
          />

          <Button title="Entrar" />
        </View>
      </View>
    </View>
  );
}

const styles = themedStyleSheet(({ colors, spacing }) => ({
  container: {
    flex: 1,
  },

  imageContainer: {
    backgroundColor: colors.primaryColor,
  },

  image: {
    width: Dimensions.get("screen").width,
    height: 280,
  },

  formWrapper: {
    flex: 1,
    paddingHorizontal: spacing.s20,
    paddingTop: spacing.s24,
    gap: spacing.s8,
  },

  formContainer: {
    marginTop: spacing.s20,
    gap: spacing.s16,
  },
}));
