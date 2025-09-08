import { render, RenderOptions } from "@testing-library/react-native";

export function AllTheProviders({ children }: React.PropsWithChildren) {
  return children;
}

function customRender(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

export * from "@testing-library/react-native";
export { customRender as render };
