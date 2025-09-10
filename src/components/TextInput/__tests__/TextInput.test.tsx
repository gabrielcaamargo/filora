import { fireEvent, render } from "test-utils";
import { TextInput } from "../TextInput";
import { TestIds } from "@test";

describe("<TextInput />", () => {
  it("should display the label", () => {
    const { getByText } = render(<TextInput label="Label" />);

    expect(getByText(/label/i)).toBeTruthy();
  });

  it("should NOT display the label when label is not provided", () => {
    const { queryByTestId } = render(<TextInput />);

    expect(queryByTestId(TestIds.TEXT_INPUT_LABEL)).toBeNull();
  });

  it("should not display the placeholder when placeholder is not provided", () => {
    const { queryByPlaceholderText } = render(<TextInput />);

    expect(queryByPlaceholderText(/placeholder/i)).toBeNull();
  });

  it("should display the placeholder when placeholder is provided", () => {
    const { getByPlaceholderText } = render(
      <TextInput placeholder="Placeholder" />
    );

    expect(getByPlaceholderText(/placeholder/i)).toBeTruthy();
  });

  it("should not be able to write in the input when disabled", () => {
    const { getByTestId } = render(<TextInput disabled />);
    const input = getByTestId(TestIds.TEXT_INPUT);

    fireEvent.changeText(input, "test");

    expect(input.props.value).toBe(undefined);
  });

  it("should be able write in the input when NOT disabled", () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(<TextInput onChangeText={onChangeText} />);

    const input = getByTestId(TestIds.TEXT_INPUT);

    fireEvent.changeText(input, "test");

    expect(onChangeText).toHaveBeenCalledWith("test");
  });

  it("should NOT be able to focus the input when disabled", () => {
    const onFocus = jest.fn();
    const { getByTestId } = render(<TextInput onFocus={onFocus} disabled />);

    const inputContainer = getByTestId(TestIds.TEXT_INPUT_CONTAINER);

    fireEvent.press(inputContainer);

    expect(onFocus).not.toHaveBeenCalled();
  });

  it("should be able to focus the input when NOT disabled", () => {
    const onFocus = jest.fn();
    const { getByTestId } = render(
      <TextInput onFocus={onFocus} disabled={false} />
    );

    const inputContainer = getByTestId(TestIds.TEXT_INPUT_CONTAINER);
    const textInput = getByTestId(TestIds.TEXT_INPUT);

    fireEvent.press(inputContainer);

    fireEvent(textInput, "focus");

    expect(onFocus).toHaveBeenCalled();
  });
});
