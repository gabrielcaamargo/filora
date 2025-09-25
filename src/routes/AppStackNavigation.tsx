import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { HomeScreen } from "@screens";

export type AppStackParamList = {
  AppTabNavigator: undefined;
};

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export function AppStackNavigation({
  initialRouteName = "AppTabNavigator",
}: {
  initialRouteName?: keyof AppStackParamList;
}) {
  const Stack = createNativeStackNavigator<AppStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name="AppTabNavigator" component={AppStackNavigation} />
    </Stack.Navigator>
  );
}
