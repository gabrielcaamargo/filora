import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { render, RenderOptions } from "@testing-library/react-native";
import { ReactElement } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

export function AllTheProviders({ children }: React.PropsWithChildren) {
  return <KeyboardProvider>{children}</KeyboardProvider>;
}

function customRender(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

export const wrapScreenProviders = () => {
  return ({ children }: { children: React.ReactNode }) => (
    <NavigationContainer>{children}</NavigationContainer>
  );
};

export function renderScreen<T = unknown>(
  component: ReactElement<T>,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(component, { wrapper: wrapScreenProviders(), ...options });
}

export * from "@testing-library/react-native";
export { customRender as render };
