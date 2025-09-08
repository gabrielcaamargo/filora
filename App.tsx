import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { themedStyleSheet } from "@theme";
import { useFonts } from "@hooks";
import { Button, Text } from "@components";

export default function App() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text preset="headingLarge" weight="Bold" color="primaryColor">
        Open up App.tsx to start working on your app!
      </Text>

      <Button title="Button" preset="outline" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = themedStyleSheet(({ colors, spacing, radius }) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    paddingHorizontal: spacing.s16,
    paddingVertical: spacing.s8,
    borderRadius: radius.s8,
  },
}));
