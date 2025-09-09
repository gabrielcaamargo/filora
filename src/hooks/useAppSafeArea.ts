import { spacing } from "@theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function useAppSafeArea() {
  const insets = useSafeAreaInsets();

  return {
    top: Math.max(insets.top, spacing.s24),
    bottom: Math.max(insets.bottom, spacing.s24),
    left: insets.left,
    right: insets.right,
  };
}
