import { Text } from "@components";
import { themedStyleSheet } from "@theme";
import { View } from "react-native";

export function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text preset="headingLarge" weight="Bold" color="primaryColor">
        LoginScreen
      </Text>
    </View>
  );
}

const styles = themedStyleSheet(() => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));
