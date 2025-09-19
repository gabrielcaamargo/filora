import { Screen } from "@components";
import { themedStyleSheet } from "@theme";
import { View } from "react-native";

export function SignupScreen() {
  return (
    <Screen canGoBack title="Criar conta">
      <View style={styles.formContainer}></View>
    </Screen>
  );
}

const styles = themedStyleSheet(() => ({
  formContainer: {
    flex: 1,
  },
}));
