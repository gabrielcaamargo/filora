import { render, renderHook } from "test-utils";
import { FormTextInput } from "../FormTextInput";
import { FormState, useForm } from "react-hook-form";
import { TestIds } from "@test";
import z from "zod";

const testSchema = z.object({
  email: z.string(),
});

const mockFormState: Partial<FormState<TestSchema>> = {
  errors: {
    email: { message: "Invalid email", type: "validate" },
  },
};

type TestSchema = z.infer<typeof testSchema>;

describe("<FormTextInput />", () => {
  it("should receive the control prop", () => {
    const { result } = renderHook(() => useForm<TestSchema>());

    const { control } = result.current;

    const { getByTestId } = render(
      <FormTextInput control={control} name="email" />
    );

    const formTextInput = getByTestId(TestIds.FORM_TEXT_INPUT);
    expect(formTextInput).toBeTruthy();
  });

  it("should display the error message when the error is provided", () => {
    const { result } = renderHook(() => useForm<TestSchema>());

    const { control } = result.current;

    const { getByText } = render(
      <FormTextInput
        control={control}
        name="email"
        errors={mockFormState.errors}
      />
    );

    const errorMessage = getByText(/invalid email/i);
    expect(errorMessage).toBeTruthy();
  });
});
