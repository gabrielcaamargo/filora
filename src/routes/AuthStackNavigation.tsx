import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { LoginScreen, SignupScreen } from "@screens";

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  ForgotPasswordScreen: undefined;
  VerifyEmailScreen: undefined;
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
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  );
}
