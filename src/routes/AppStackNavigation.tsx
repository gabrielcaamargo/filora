import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { HomeScreen } from "@screens";

export type AppStackParamList = {
  HomeScreen: undefined;
};

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export function AppStackNavigation({
  initialRouteName = "HomeScreen",
}: {
  initialRouteName?: keyof AppStackParamList;
}) {
  const Stack = createNativeStackNavigator<AppStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      // initialRouteName="ResultScreen"
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}
