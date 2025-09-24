import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react-native";
import { ReactElement } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";

export function AllTheProviders({ children }: React.PropsWithChildren) {
  return <KeyboardProvider>{children}</KeyboardProvider>;
}

function customRender(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

export const wrapScreenProviders = () => {
  const queryClient = new QueryClient({});

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <KeyboardProvider>{children}</KeyboardProvider>
      </NavigationContainer>
    </QueryClientProvider>
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
