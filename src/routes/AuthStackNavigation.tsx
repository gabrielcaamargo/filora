import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { LoginScreen, ResultScreen, SignupScreen } from "@screens";

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  ForgotPasswordScreen: undefined;
  VerifyEmailScreen: undefined;
  ResultScreen: {
    type: "success" | "error";
    title: string;
    message: string;
    buttonTitle: string;
    onAccept: VoidFunction;
  };
};

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export function AuthStackNavigation({
  initialRouteName = "LoginScreen",
}: {
  initialRouteName?: keyof AuthStackParamList;
}) {
  const Stack = createNativeStackNavigator<AuthStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      // initialRouteName="ResultScreen"
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
    </Stack.Navigator>
  );
}
