import { TextInput } from "@components";
import { AuthScreenProps } from "@routes";
import { themedStyleSheet } from "@theme";
import { View } from "react-native";

export function LoginScreen({}: AuthScreenProps<"LoginScreen">) {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" label="Email" />
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
