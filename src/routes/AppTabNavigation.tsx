import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "@screens";

export type AppTabParamList = {
  HomeScreen: undefined;
  FilesScreen: undefined;
  ProfileScreen: undefined;
};

export function AppTabNavigation() {
  const Tab = createBottomTabNavigator<AppTabParamList>();

  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
    </Tab.Navigator>
  );
}
