import { renderHook } from "test-utils";
import { useToast } from "../useToast";

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: jest.fn().mockReturnValue({ top: 0 }),
}));

describe("useToast", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call showToast when showToast is called", () => {
    const { result } = renderHook(() => useToast());
    const showToastSpy = jest.spyOn(result.current, "showToast");

    result.current.showToast("success", "Success", "Success message");

    expect(showToastSpy).toHaveBeenCalled();
  });

  it("should call hideToast when hideToast is called", () => {
    const { result } = renderHook(() => useToast());
    const hideToastSpy = jest.spyOn(result.current, "hideToast");

    result.current.hideToast();

    expect(hideToastSpy).toHaveBeenCalled();
  });
});
