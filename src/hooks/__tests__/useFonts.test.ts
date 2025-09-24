import { AllTheProviders, renderHook } from "test-utils";
import { useFonts } from "../useFonts";

jest.mock("@expo-google-fonts/inter", () => ({
  Inter_400Regular: "Inter_400Regular",
  Inter_500Medium: "Inter_500Medium",
  Inter_600SemiBold: "Inter_600SemiBold",
  Inter_700Bold: "Inter_700Bold",
  useFonts: jest.fn(),
}));

const mockedUseExpoFonts = jest.mocked(
  require("@expo-google-fonts/inter").useFonts
);

describe("useFonts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return true if the fonts are loaded", () => {
    mockedUseExpoFonts.mockReturnValue([true]);

    const { result } = renderHook(() => useFonts(), {
      wrapper: AllTheProviders,
    });

    expect(result.current).toBe(true);
  });

  it("should return false if the fonts are NOT loaded", () => {
    mockedUseExpoFonts.mockReturnValue([false]);

    const { result } = renderHook(() => useFonts(), {
      wrapper: AllTheProviders,
    });

    expect(result.current).toBe(false);
  });
});
