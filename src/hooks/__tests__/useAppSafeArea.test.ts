import { AllTheProviders, renderHook } from "test-utils";
import { useAppSafeArea } from "../useAppSafeArea";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

jest.mock("react-native-safe-area-context");
const mockedUseSafeAreaInsets = jest.mocked(useSafeAreaInsets);

describe("useAppSafeArea", () => {
  it("if the vertical insets are less than 24, it should return 24", () => {
    mockedUseSafeAreaInsets.mockImplementationOnce(
      () => ({ top: 10, bottom: 10 } as EdgeInsets)
    );

    const { result } = renderHook(() => useAppSafeArea(), {
      wrapper: AllTheProviders,
    });

    expect(result.current.top).toBe(24);
    expect(result.current.bottom).toBe(24);
  });

  it("if the vertical insets are greater than 24, it should return the insets", () => {
    mockedUseSafeAreaInsets.mockImplementationOnce(
      () => ({ top: 30, bottom: 30 } as EdgeInsets)
    );

    const { result } = renderHook(() => useAppSafeArea(), {
      wrapper: AllTheProviders,
    });

    expect(result.current.top).toBe(30);
    expect(result.current.bottom).toBe(30);
  });
});
