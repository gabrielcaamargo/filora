import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { themedStyleSheet } from "@theme";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Open up App.tsx to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = themedStyleSheet(({ colors }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: colors.textColor,
  },
}));
