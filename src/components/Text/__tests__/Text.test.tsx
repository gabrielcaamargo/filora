import { render } from "test-utils";
import { Text } from "../Text";

describe("<Text />", () => {
  it("should render the text correctly", () => {
    const { getByText } = render(<Text>Hello</Text>);

    expect(getByText(/hello/i)).toBeTruthy();
  });
});
