import { fireEvent, render } from "test-utils";
import { Button } from "../Button";
import { TestIds } from "@test";

describe("<Button />", () => {
  it("should render button title", () => {
    const { getByText } = render(<Button title="Button" />);

    expect(getByText(/button/i)).toBeTruthy();
  });

  it("should call onPress when button is pressed", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<Button title="Button" onPress={onPress} />);

    fireEvent.press(getByTestId(TestIds.BUTTON));

    expect(onPress).toHaveBeenCalled();
  });

  it("should NOT call onPress when button is disabled", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Button title="Button" onPress={onPress} disabled />
    );

    fireEvent.press(getByTestId(TestIds.BUTTON));

    expect(onPress).not.toHaveBeenCalled();
  });
});
