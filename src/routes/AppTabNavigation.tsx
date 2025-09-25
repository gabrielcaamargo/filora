import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  ProfileScreen,
  SettingsScreen,
  ShareScreen,
} from "@screens";

export type AppTabParamList = {
  HomeScreen: undefined;
  ShareScreen: undefined;
  ProfileScreen: undefined;
  SettingsScreen: undefined;
};

export function AppTabNavigation() {
  const Tab = createBottomTabNavigator<AppTabParamList>();

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
  };

  console.log("Rendered tabBar");

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="ShareScreen" component={ShareScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
