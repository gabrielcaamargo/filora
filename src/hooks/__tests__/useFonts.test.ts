import { renderHook } from "@testing-library/react-native";
import { useFonts } from "../useFonts";

jest.mock("@expo-google-fonts/inter", () => ({
  Inter_400Regular: "Inter_400Regular",
  Inter_500Medium: "Inter_500Medium",
  Inter_600SemiBold: "Inter_600SemiBold",
  Inter_700Bold: "Inter_700Bold",
  useFonts: jest.fn(),
}));

function testMockUseExpoFontsCall(mockUseExpoFonts: jest.Mock) {
  expect(mockUseExpoFonts).toHaveBeenCalledWith({
    Inter_400Regular: "Inter_400Regular",
    Inter_500Medium: "Inter_500Medium",
    Inter_600SemiBold: "Inter_600SemiBold",
    Inter_700Bold: "Inter_700Bold",
  });
}

describe("useFonts", () => {
  const mockUseExpoFonts = require("@expo-google-fonts/inter").useFonts;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return true when fonts are loaded", () => {
    mockUseExpoFonts.mockReturnValue([true]);

    const { result } = renderHook(() => useFonts());

    expect(result.current).toBe(true);
    testMockUseExpoFontsCall(mockUseExpoFonts);
  });

  it("should return false when fonts are NOT loaded", () => {
    mockUseExpoFonts.mockReturnValue([false]);

    const { result } = renderHook(() => useFonts());

    expect(result.current).toBe(false);
    testMockUseExpoFontsCall(mockUseExpoFonts);
  });

  it("should call useExpoFonts with the correct font configuration", () => {
    mockUseExpoFonts.mockReturnValue([true]);

    renderHook(() => useFonts());

    expect(mockUseExpoFonts).toHaveBeenCalledTimes(1);
    testMockUseExpoFontsCall(mockUseExpoFonts);
  });
});
