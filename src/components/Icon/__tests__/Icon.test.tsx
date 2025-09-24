import { fireEvent, render } from "test-utils";
import { Icon } from "../Icon";
import { TestIds } from "@test";

jest.spyOn(console, "warn").mockImplementation(() => {});

describe("<Icon />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should not render the icon if the variant is not valid", () => {
    const { queryByTestId } = render(
      <Icon variant={"InvalidVariant" as any} name="mail" />
    );

    const icon = queryByTestId(TestIds.ICON)!;

    expect(icon).toBeNull();
  });

  it("should render the icon if the name is valid", () => {
    const { queryByTestId } = render(<Icon variant="AntDesign" name="mail" />);

    const icon = queryByTestId(TestIds.ICON);

    expect(icon).toBeTruthy();
  });

  it("should call onPressIcon when the icon is pressed", () => {
    const onPressIcon = jest.fn();
    const { getByTestId } = render(
      <Icon variant="AntDesign" name="mail" onPressIcon={onPressIcon} />
    );

    fireEvent.press(getByTestId(TestIds.ICON_CONTAINER));

    expect(onPressIcon).toHaveBeenCalled();
  });
});
