if (__DEV__) {
  require("./ReactotronConfig");
}

import { useFonts } from "@hooks";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Routes } from "@routes";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@api";
import Toast from "react-native-toast-message";

export default function App() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <Routes />
          <Toast />
        </KeyboardProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
