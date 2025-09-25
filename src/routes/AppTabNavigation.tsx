import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  ProfileScreen,
  SettingsScreen,
  ShareScreen,
} from "@screens";
import { AppTabBar } from "./AppTabBar";

export type AppTabParamList = {
  HomeScreen: undefined;
  ShareScreen: undefined;
  ProfileScreen: undefined;
  SettingsScreen: undefined;
};

export function AppTabNavigation() {
  const Tab = createBottomTabNavigator<AppTabParamList>();

  function renderTabBar(props: BottomTabBarProps) {
    return <AppTabBar {...props} />;
  }

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
  };

  return (
    <Tab.Navigator screenOptions={screenOptions} tabBar={renderTabBar}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="ShareScreen" component={ShareScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
