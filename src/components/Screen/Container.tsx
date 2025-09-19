import { ScrollView, ScrollViewProps, View, ViewProps } from "react-native";

export function ScrollViewContainer({
  children,
  scrollViewProps,
}: React.PropsWithChildren<{ scrollViewProps?: ScrollViewProps }>) {
  return <ScrollView {...scrollViewProps}>{children}</ScrollView>;
}

export function ViewContainer({
  children,
  viewProps,
}: React.PropsWithChildren<{ viewProps?: ViewProps }>) {
  return <View {...viewProps}>{children}</View>;
}
