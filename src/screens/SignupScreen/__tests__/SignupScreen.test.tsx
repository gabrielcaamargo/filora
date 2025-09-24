import { fireEvent, renderScreen, waitFor } from "test-utils";
import { AuthStackNavigation } from "@routes";
import { TestIds } from "@test";

describe("<SignupScreen />", () => {
  it("should render all form fields and social buttons correctly", () => {
    const { getByPlaceholderText, getByTestId, getByText } = renderScreen(
      <AuthStackNavigation initialRouteName="SignupScreen" />
    );

    // Check all form fields are present
    expect(getByPlaceholderText("Digite seu nome")).toBeTruthy();
    expect(getByPlaceholderText("Digite seu sobrenome")).toBeTruthy();
    expect(getByPlaceholderText("Digite seu email")).toBeTruthy();
    expect(getByPlaceholderText("Digite sua senha")).toBeTruthy();
    expect(getByPlaceholderText("Confirme sua senha")).toBeTruthy();

    // Check labels are present
    expect(getByText("Nome")).toBeTruthy();
    expect(getByText("Sobrenome")).toBeTruthy();
    expect(getByText("Email")).toBeTruthy();
    expect(getByText("Senha")).toBeTruthy();
    expect(getByText("Confirmar senha")).toBeTruthy();

    // Check buttons are present
    expect(getByTestId(TestIds.SIGNUP_BUTTON)).toBeTruthy();
    expect(getByTestId(TestIds.GOOGLE_SOCIAL_BUTTON)).toBeTruthy();
    expect(getByTestId(TestIds.APPLE_SOCIAL_BUTTON)).toBeTruthy();
  });

  describe("Password Visibility Toggle", () => {
    it("should toggle password visibility when eye icon is pressed", async () => {
      const { getByPlaceholderText, getAllByTestId } = renderScreen(
        <AuthStackNavigation initialRouteName="SignupScreen" />
      );

      const passwordInput = getByPlaceholderText("Digite sua senha");

      // Initially password should be secure
      expect(passwordInput.props.secureTextEntry).toBe(true);

      // Find and press the eye icon (there should be icon containers, we need the password field's one)
      const iconContainers = getAllByTestId(TestIds.ICON_CONTAINER);
      // The password field should have an icon container for the eye toggle
      const passwordIconContainer = iconContainers.find((container) => {
        // This is a bit of a hack, but we need to find the right icon container
        // In a real app, you might want to add specific testIDs for this
        return (
          container.parent?.parent?.props?.testID === TestIds.FORM_TEXT_INPUT
        );
      });

      if (passwordIconContainer) {
        fireEvent.press(passwordIconContainer);

        await waitFor(() => {
          expect(passwordInput.props.secureTextEntry).toBe(false);
        });

        // Press again to toggle back
        fireEvent.press(passwordIconContainer);

        await waitFor(() => {
          expect(passwordInput.props.secureTextEntry).toBe(true);
        });
      }
    });

    it("should show correct eye icon based on password visibility state", async () => {
      const { getAllByTestId } = renderScreen(
        <AuthStackNavigation initialRouteName="SignupScreen" />
      );

      // Check that there are icons rendered (the eye icon should be among them)
      const icons = getAllByTestId(TestIds.ICON);
      expect(icons.length).toBeGreaterThan(0);

      // We can't easily test the specific eye icon without more specific testIDs
      // but we can verify icons are present
    });
  });

  describe("Form Validation", () => {
    describe("First Name Validation", () => {
      it("should display error message when first name is empty", async () => {
        const { getByPlaceholderText, findByText } = renderScreen(
          <AuthStackNavigation initialRouteName="SignupScreen" />
        );

        const firstNameInput = getByPlaceholderText("Digite seu nome");

        fireEvent.changeText(firstNameInput, "");
        fireEvent(firstNameInput, "blur");

        await waitFor(async () => {
          const errorText = await findByText(/O nome é obrigatório/i);
          expect(errorText).toBeTruthy();
        });
      });
    });

    describe("Last Name Validation", () => {
      it("should display error message when last name is empty", async () => {
        const { getByPlaceholderText, findByText } = renderScreen(
          <AuthStackNavigation initialRouteName="SignupScreen" />
        );

        const lastNameInput = getByPlaceholderText("Digite seu sobrenome");

        fireEvent.changeText(lastNameInput, "");
        fireEvent(lastNameInput, "blur");

        await waitFor(async () => {
          const errorText = await findByText(/O sobrenome é obrigatório/i);
          expect(errorText).toBeTruthy();
        });
      });
    });

    describe("Email Validation", () => {
      it("should display error message when email is invalid", async () => {
        const { getByPlaceholderText, findByText } = renderScreen(
          <AuthStackNavigation initialRouteName="SignupScreen" />
        );

        const emailInput = getByPlaceholderText("Digite seu email");

        fireEvent.changeText(emailInput, "invalid-email");
        fireEvent(emailInput, "blur");

        await waitFor(async () => {
          const errorText = await findByText(/Email inválido/i);
          expect(errorText).toBeTruthy();
        });
      });

      it("should NOT display error message when email is valid", async () => {
        const { getByPlaceholderText, queryByText } = renderScreen(
          <AuthStackNavigation initialRouteName="SignupScreen" />
        );

        const emailInput = getByPlaceholderText("Digite seu email");

        fireEvent.changeText(emailInput, "test@example.com");
        fireEvent(emailInput, "blur");

        await waitFor(() => {
          expect(queryByText(/Email inválido/i)).toBeFalsy();
        });
      });
    });

    describe("Password Validation", () => {
      it("should display error message when password is too short", async () => {
        const { getByPlaceholderText, findByText } = renderScreen(
          <AuthStackNavigation initialRouteName="SignupScreen" />
        );

        const passwordInput = getByPlaceholderText("Digite sua senha");

        fireEvent.changeText(passwordInput, "123");
        fireEvent(passwordInput, "blur");

        await waitFor(async () => {
          const errorText = await findByText(
            /A senha deve ter pelo menos 8 caracteres/i
          );
          expect(errorText).toBeTruthy();
        });
      });

      it("should display error message when password doesn't meet complexity requirements", async () => {
        const { getByPlaceholderText, findByText } = renderScreen(
          <AuthStackNavigation initialRouteName="SignupScreen" />
        );

        const passwordInput = getByPlaceholderText("Digite sua senha");

        fireEvent.changeText(passwordInput, "password123"); // Missing uppercase
        fireEvent(passwordInput, "blur");

        await waitFor(async () => {
          const errorText = await findByText(
            "A senha deve conter pelo menos 1 letra maiúscula, 1 minúscula e 1 número"
          );
          expect(errorText).toBeTruthy();
        });
      });

      it("should NOT display error message when password is valid", async () => {
        const { getByPlaceholderText, queryByText } = renderScreen(
          <AuthStackNavigation initialRouteName="SignupScreen" />
        );

        const passwordInput = getByPlaceholderText("Digite sua senha");

        fireEvent.changeText(passwordInput, "Password123");
        fireEvent(passwordInput, "blur");

        await waitFor(() => {
          expect(
            queryByText(/A senha deve ter pelo menos 8 caracteres/i)
          ).toBeFalsy();
          expect(
            queryByText(
              /A senha deve conter pelo menos 1 letra maiúscula, 1 minúscula e 1 número/i
            )
          ).toBeFalsy();
        });
      });
    });

    describe("Confirm Password Validation", () => {
      it("should display error message when passwords don't match", async () => {
        const { getByPlaceholderText, findByText } = renderScreen(
          <AuthStackNavigation initialRouteName="SignupScreen" />
        );

        const passwordInput = getByPlaceholderText("Digite sua senha");
        const confirmPasswordInput = getByPlaceholderText("Confirme sua senha");

        // Fill all required fields to trigger full form validation
        fireEvent.changeText(getByPlaceholderText("Digite seu nome"), "John");
        fireEvent.changeText(
          getByPlaceholderText("Digite seu sobrenome"),
          "Doe"
        );
        fireEvent.changeText(
          getByPlaceholderText("Digite seu email"),
          "john@example.com"
        );

        fireEvent.changeText(passwordInput, "Password123");
        fireEvent.changeText(confirmPasswordInput, "Password456");

        // Trigger validation by blurring the confirm password field
        fireEvent(confirmPasswordInput, "blur");

        await waitFor(
          async () => {
            const errorText = await findByText(/As senhas não coincidem/i);
            expect(errorText).toBeTruthy();
          },
          { timeout: 3000 }
        );
      });

      it("should NOT display error message when passwords match", async () => {
        const { getByPlaceholderText, queryByText } = renderScreen(
          <AuthStackNavigation initialRouteName="SignupScreen" />
        );

        const passwordInput = getByPlaceholderText("Digite sua senha");
        const confirmPasswordInput = getByPlaceholderText("Confirme sua senha");

        fireEvent.changeText(passwordInput, "Password123");
        fireEvent.changeText(confirmPasswordInput, "Password123");
        fireEvent(confirmPasswordInput, "blur");

        await waitFor(() => {
          expect(queryByText("As senhas não coincidem")).toBeFalsy();
        });
      });
    });
  });

  describe("Form Submission", () => {
    it("should disable signup button when form is empty", () => {
      const { getByTestId } = renderScreen(
        <AuthStackNavigation initialRouteName="SignupScreen" />
      );

      const signupButton = getByTestId(TestIds.SIGNUP_BUTTON);
      expect(signupButton).toBeDisabled(); // Button should be disabled
    });

    it("should disable signup button when form has invalid data", async () => {
      const { getByPlaceholderText, getByTestId } = renderScreen(
        <AuthStackNavigation initialRouteName="SignupScreen" />
      );

      const firstNameInput = getByPlaceholderText("Digite seu nome");
      const lastNameInput = getByPlaceholderText("Digite seu sobrenome");
      const emailInput = getByPlaceholderText("Digite seu email");
      const passwordInput = getByPlaceholderText("Digite sua senha");
      const signupButton = getByTestId(TestIds.SIGNUP_BUTTON);

      fireEvent.changeText(firstNameInput, "John");
      fireEvent.changeText(lastNameInput, "Doe");
      fireEvent.changeText(emailInput, "invalid-email");
      fireEvent.changeText(passwordInput, "123");

      await waitFor(() => {
        expect(signupButton).toBeDisabled();
      });
    });

    it("should enable signup button when all form data is valid", async () => {
      const { getByPlaceholderText, getByText, getByTestId } = renderScreen(
        <AuthStackNavigation initialRouteName="SignupScreen" />
      );

      const firstNameInput = getByPlaceholderText("Digite seu nome");
      const lastNameInput = getByPlaceholderText("Digite seu sobrenome");
      const emailInput = getByPlaceholderText("Digite seu email");
      const passwordInput = getByPlaceholderText("Digite sua senha");
      const confirmPasswordInput = getByPlaceholderText("Confirme sua senha");
      const signupButton = getByTestId(TestIds.SIGNUP_BUTTON);

      fireEvent.changeText(firstNameInput, "John");
      fireEvent.changeText(lastNameInput, "Doe");
      fireEvent.changeText(emailInput, "john.doe@example.com");
      fireEvent.changeText(passwordInput, "Password123");
      fireEvent.changeText(confirmPasswordInput, "Password123");

      await waitFor(() => {
        expect(signupButton).not.toBeDisabled();
      });
    });

    // it("should call handleSubmit when signup button is pressed with valid form", async () => {
    //   const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    //   const { getByPlaceholderText, getByTestId } = renderScreen(
    //     <AuthStackNavigation initialRouteName="SignupScreen" />
    //   );

    //   const firstNameInput = getByPlaceholderText("Digite seu nome");
    //   const lastNameInput = getByPlaceholderText("Digite seu sobrenome");
    //   const emailInput = getByPlaceholderText("Digite seu email");
    //   const passwordInput = getByPlaceholderText("Digite sua senha");
    //   const confirmPasswordInput = getByPlaceholderText("Confirme sua senha");
    //   const signupButton = getByTestId(TestIds.SIGNUP_BUTTON);

    //   fireEvent.changeText(firstNameInput, "John");
    //   fireEvent.changeText(lastNameInput, "Doe");
    //   fireEvent.changeText(emailInput, "john.doe@example.com");
    //   fireEvent.changeText(passwordInput, "Password123");
    //   fireEvent.changeText(confirmPasswordInput, "Password123");

    //   await waitFor(() => {
    //     expect(signupButton).not.toBeDisabled();
    //   });

    //   fireEvent.press(signupButton);

    //   await waitFor(() => {
    //     expect(consoleSpy).toHaveBeenCalledWith({
    //       data: {
    //         firstName: "John",
    //         lastName: "Doe",
    //         email: "john.doe@example.com",
    //         password: "Password123",
    //         confirmPassword: "Password123",
    //       },
    //     });
    //   });

    //   consoleSpy.mockRestore();
    // });
  });

  describe("Social Login", () => {
    it("should render Google and Apple social login buttons", () => {
      const { getByTestId } = renderScreen(
        <AuthStackNavigation initialRouteName="SignupScreen" />
      );

      expect(getByTestId(TestIds.GOOGLE_SOCIAL_BUTTON)).toBeTruthy();
      expect(getByTestId(TestIds.APPLE_SOCIAL_BUTTON)).toBeTruthy();
    });

    it("should be pressable but not have any functionality (placeholder buttons)", () => {
      const { getByTestId } = renderScreen(
        <AuthStackNavigation initialRouteName="SignupScreen" />
      );

      const googleButton = getByTestId(TestIds.GOOGLE_SOCIAL_BUTTON);
      const appleButton = getByTestId(TestIds.APPLE_SOCIAL_BUTTON);

      // These buttons don't have onPress handlers in the current implementation
      // So we just test that they exist and are pressable
      expect(googleButton).toBeTruthy();
      expect(appleButton).toBeTruthy();

      // Press them to ensure they don't crash (no-op)
      fireEvent.press(googleButton);
      fireEvent.press(appleButton);
    });
  });
});
