import { fireEvent, renderScreen, waitFor } from "test-utils";
import { AuthStackNavigation } from "@routes";
import { TestIds } from "@test";
import { mockUser, User } from "@domain";
import { authService } from "@domain";

describe("<LoginScreen />", () => {
  it("should render the social buttons correctly", () => {
    const { getByTestId } = renderScreen(
      <AuthStackNavigation initialRouteName="LoginScreen" />
    );

    expect(getByTestId(TestIds.GOOGLE_SOCIAL_BUTTON)).toBeTruthy();
    expect(getByTestId(TestIds.APPLE_SOCIAL_BUTTON)).toBeTruthy();
  });

  describe("Password Visibility Toggle", () => {
    it("should toggle password visibility when eye icon is pressed", async () => {
      const { getByPlaceholderText, getByTestId } = renderScreen(
        <AuthStackNavigation initialRouteName="LoginScreen" />
      );

      const passwordInput = getByPlaceholderText(/Digite sua senha/i);

      // Initially password should be secure
      expect(passwordInput.props.secureTextEntry).toBe(true);

      // Find and press the eye icon
      const iconContainers = getByTestId(TestIds.ICON_CONTAINER);
      fireEvent.press(iconContainers);

      await waitFor(() => {
        expect(passwordInput.props.secureTextEntry).toBe(false);
      });
    });
  });

  describe("Form Validation", () => {
    it("should display error message when email is invalid", async () => {
      const { getByPlaceholderText, findByText } = renderScreen(
        <AuthStackNavigation initialRouteName="LoginScreen" />
      );

      const emailInput = getByPlaceholderText(/Digite seu email/i);

      // Enter invalid email and trigger validation
      fireEvent.changeText(emailInput, "invalid-email");
      fireEvent(emailInput, "blur");

      // Wait for validation error to appear
      await waitFor(async () => {
        const errorText = await findByText(/Email inválido/i);
        expect(errorText).toBeTruthy();
      });
    });

    it("should display error message when password is too short", async () => {
      const { getByPlaceholderText, findByText } = renderScreen(
        <AuthStackNavigation initialRouteName="LoginScreen" />
      );

      const passwordInput = getByPlaceholderText(/Digite sua senha/i);

      fireEvent.changeText(passwordInput, "123");
      fireEvent(passwordInput, "blur");

      await waitFor(async () => {
        const errorText = await findByText(
          /A senha deve ter pelo menos 8 caracteres/i
        );
        expect(errorText).toBeTruthy();
      });
    });

    it("should NOT display error messages when fields are valid", async () => {
      const { getByPlaceholderText, queryByText } = renderScreen(
        <AuthStackNavigation initialRouteName="LoginScreen" />
      );

      const emailInput = getByPlaceholderText(/Digite seu email/i);
      const passwordInput = getByPlaceholderText(/Digite sua senha/i);

      fireEvent.changeText(emailInput, "test@example.com");
      fireEvent.changeText(passwordInput, "Password123");
      fireEvent(emailInput, "blur");
      fireEvent(passwordInput, "blur");

      await waitFor(() => {
        expect(queryByText("Email inválido")).toBeFalsy();
        expect(
          queryByText(/A senha deve ter pelo menos 8 caracteres/i)
        ).toBeFalsy();
      });
    });
  });

  describe("Form Submission", () => {
    it("should disable login button when form is empty", () => {
      const { getByTestId } = renderScreen(
        <AuthStackNavigation initialRouteName="LoginScreen" />
      );

      const loginButton = getByTestId(TestIds.LOGIN_BUTTON);
      expect(loginButton).toBeDisabled();
    });

    it("should disable login button when form has invalid data", async () => {
      const { getByPlaceholderText, getByTestId } = renderScreen(
        <AuthStackNavigation initialRouteName="LoginScreen" />
      );

      const emailInput = getByPlaceholderText(/Digite seu email/i);
      const passwordInput = getByPlaceholderText(/Digite sua senha/i);
      const loginButton = getByTestId(TestIds.LOGIN_BUTTON);

      fireEvent.changeText(emailInput, "invalid-email");
      fireEvent.changeText(passwordInput, "123");

      await waitFor(() => {
        expect(loginButton).toBeDisabled();
      });
    });

    it("should enable login button when form has valid data", async () => {
      const { getByPlaceholderText, getByTestId } = renderScreen(
        <AuthStackNavigation initialRouteName="LoginScreen" />
      );

      const emailInput = getByPlaceholderText(/Digite seu email/i);
      const passwordInput = getByPlaceholderText(/Digite sua senha/i);
      const loginButton = getByTestId(TestIds.LOGIN_BUTTON);

      fireEvent.changeText(emailInput, "test@example.com");
      fireEvent.changeText(passwordInput, "Password123");

      await waitFor(() => {
        expect(loginButton).not.toBeDisabled();
      });
    });

    //TODO: Fix this test
  //   it("should call handleSubmit when login button is pressed with valid form", async () => {
  //     const mockUser: User = {
  //       id: "test-uid-123",
  //       email: "test@example.com",
  //       fullName: "John Doe",
  //       isNewUser: true,
  //       createdAt: "2024-01-15T10:30:00.000Z",
  //       emailVerified: false,
  //     };

  //     const mockShowToast = jest.fn();
  //     const loginServiceSpy = jest
  //       .spyOn(authService, "loginWithEmailAndPassword")
  //       .mockResolvedValue(mockUser);

  //     const { getByPlaceholderText, getByTestId } = renderScreen(
  //       <AuthStackNavigation initialRouteName="LoginScreen" />
  //     );

  //     const emailInput = getByPlaceholderText(/Digite seu email/i);
  //     const passwordInput = getByPlaceholderText(/Digite sua senha/i);
  //     const loginButton = getByTestId(TestIds.LOGIN_BUTTON);

  //     fireEvent.changeText(emailInput, "test@example.com");
  //     fireEvent.changeText(passwordInput, "Password123");

  //     await waitFor(() => {
  //       expect(loginButton).not.toBeDisabled();
  //     });

  //     fireEvent.press(loginButton);

  //     expect(loginServiceSpy).toHaveBeenCalledWith({
  //       email: "test@example.com",
  //       password: "Password123",
  //     });
  //     expect(mockShowToast).toHaveBeenCalledWith(
  //       "success",
  //       "Login realizado com sucesso",
  //       "Você agora pode aproveitar o Filora"
  //     );
  //   });
  // });

  describe("Social Login", () => {
    it("should call handleSocialLogin with 'google' when Google button is pressed", () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      const { getByTestId } = renderScreen(
        <AuthStackNavigation initialRouteName="LoginScreen" />
      );

      const googleButton = getByTestId(TestIds.GOOGLE_SOCIAL_BUTTON);
      fireEvent.press(googleButton);

      expect(consoleSpy).toHaveBeenCalledWith("google");
      consoleSpy.mockRestore();
    });

    it("should call handleSocialLogin with 'apple' when Apple button is pressed", () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      const { getByTestId } = renderScreen(
        <AuthStackNavigation initialRouteName="LoginScreen" />
      );

      const appleButton = getByTestId(TestIds.APPLE_SOCIAL_BUTTON);
      fireEvent.press(appleButton);

      expect(consoleSpy).toHaveBeenCalledWith("apple");
      consoleSpy.mockRestore();
    });
  });
});
