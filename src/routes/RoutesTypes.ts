import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./AuthStackNavigation";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { AppTabParamList } from "./AppTabNavigation";
import { AppStackParamList } from "./AppStackNavigation";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList {}
  }
}

export type AuthScreenProps<RouteName extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, RouteName>;

export type AppScreenProps<RouteName extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, RouteName>;

export type AppTabScreenProps<RouteName extends keyof AppTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList, RouteName>,
    NativeStackScreenProps<AppStackParamList, "AppTabNavigator">
  >;
