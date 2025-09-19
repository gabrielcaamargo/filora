import { fireEvent, render } from "test-utils";
import { Screen } from "../Screen";
import { TestIds } from "@test";

const mockedGoBackFunction = jest.fn();

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: jest
    .fn()
    .mockReturnValue({ top: 24, bottom: 24, left: 0, right: 0 }),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({
    goBack: mockedGoBackFunction,
  })),
}));

describe("<Screen />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedGoBackFunction.mockClear();
  });

  it("should render a View if scrollable is false", () => {
    const { getByTestId } = render(<Screen scrollable={false} />);

    const viewElement = getByTestId(TestIds.SCREEN_VIEW);
    expect(viewElement).toBeTruthy();
  });

  it("should render a ScrollView if scrollable is true", () => {
    const { getByTestId } = render(<Screen scrollable />);

    const scrollViewElement = getByTestId(TestIds.SCREEN_SCROLL_VIEW);
    expect(scrollViewElement).toBeTruthy();
  });

  it("should have horizontal padding if withHorizontalPadding is true", () => {
    const { getByTestId } = render(<Screen withHorizontalPadding />);
    const viewElement = getByTestId(TestIds.SCREEN_VIEW_CONTENT);

    expect(viewElement).toHaveStyle({ paddingHorizontal: 20 });
  });

  it("should NOT have horizontal padding if withHorizontalPadding is false", () => {
    const { getByTestId } = render(<Screen withHorizontalPadding={false} />);
    const viewElement = getByTestId(TestIds.SCREEN_VIEW_CONTENT);

    expect(viewElement).not.toHaveStyle({ paddingHorizontal: 20 });
  });

  it("should have vertical padding if hasVerticalInsets is true", () => {
    const { getByTestId } = render(<Screen hasVerticalInsets />);
    const viewElement = getByTestId(TestIds.SCREEN_VIEW_CONTENT);

    expect(viewElement).toHaveStyle({ paddingTop: 24 });
  });

  it("should NOT have vertical padding if hasVerticalInsets is false", () => {
    const { getByTestId } = render(<Screen hasVerticalInsets={false} />);
    const viewElement = getByTestId(TestIds.SCREEN_VIEW_CONTENT);

    expect(viewElement).not.toHaveStyle({ paddingTop: 24 });
  });

  it("should display the title if title is provided", () => {
    const { getByText } = render(<Screen title="Title" />);
    const titleElement = getByText("Title");
    expect(titleElement).toBeTruthy();
  });

  it("should NOT display the title if title is not provided", () => {
    const { queryByText } = render(<Screen />);
    const titleElement = queryByText("Title");
    expect(titleElement).toBeNull();
  });

  it("should display the back button if canGoBack is true", () => {
    const { getByTestId } = render(<Screen canGoBack />);
    const backButtonElement = getByTestId(TestIds.SCREEN_BACK_BUTTON);
    expect(backButtonElement).toBeTruthy();
  });

  it("should NOT display the back button if canGoBack is false", () => {
    const { queryByTestId } = render(<Screen canGoBack={false} />);
    const backButtonElement = queryByTestId(TestIds.SCREEN_BACK_BUTTON);
    expect(backButtonElement).toBeNull();
  });

  it("should call the goBack function when the back button is pressed", () => {
    const { getByTestId } = render(<Screen canGoBack />);
    const backButtonElement = getByTestId(TestIds.SCREEN_BACK_BUTTON);
    fireEvent.press(backButtonElement);

    expect(mockedGoBackFunction).toHaveBeenCalled();
  });
});
