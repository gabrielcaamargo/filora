import Toast from "react-native-toast-message";
import { useAppSafeArea } from "./useAppSafeArea";

export function useToast() {
  const { top } = useAppSafeArea();

  function showToast(
    type: "success" | "error",
    title: string,
    message: string,
    duration: number = 3000
  ) {
    Toast.show({
      type,
      topOffset: top,
      text1: title,
      text2: message,
      visibilityTime: duration,
      text1Style: {
        fontFamily: "Inter_600Bold",
        fontSize: 16,
      },
      text2Style: {
        fontFamily: "Inter_400Regular",
        fontSize: 14,
      },
    });
  }

  function hideToast() {
    Toast.hide();
  }

  return {
    showToast,
    hideToast,
  };
}
