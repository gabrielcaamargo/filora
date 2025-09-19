import { TestIds } from "@test";
import { ScrollView, ScrollViewProps, View, ViewProps } from "react-native";

export function ScrollViewContainer({
  children,
  scrollViewProps,
}: React.PropsWithChildren<{ scrollViewProps?: ScrollViewProps }>) {
  return (
    <ScrollView {...scrollViewProps} testID={TestIds.SCREEN_SCROLL_VIEW}>
      {children}
    </ScrollView>
  );
}

export function ViewContainer({
  children,
  viewProps,
}: React.PropsWithChildren<{ viewProps?: ViewProps }>) {
  return (
    <View {...viewProps} testID={TestIds.SCREEN_VIEW}>
      {children}
    </View>
  );
}
