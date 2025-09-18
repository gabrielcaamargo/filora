import { useFonts } from "@hooks";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Routes } from "@routes";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function App() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <Routes />
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}
