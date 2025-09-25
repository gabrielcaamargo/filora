import { IconVariant } from "@components";
import { AppTabParamList } from "./AppTabNavigation";

export const mapTabScreen: Record<
  keyof AppTabParamList,
  {
    label: string;
    icon: {
      focusedVariant: IconVariant;
      unfocusedVariant: IconVariant;
      focusedName: string;
      unfocusedName: string;
    };
  }
> = {
  HomeScreen: {
    label: "Home",
    icon: {
      focusedVariant: "Feather",
      unfocusedVariant: "Feather",
      focusedName: "home",
      unfocusedName: "home",
    },
  },
  ShareScreen: {
    label: "Share",
    icon: {
      focusedVariant: "Feather",
      unfocusedVariant: "Feather",
      focusedName: "share",
      unfocusedName: "share",
    },
  },
  ProfileScreen: {
    label: "Profile",
    icon: {
      focusedVariant: "Feather",
      unfocusedVariant: "Feather",
      focusedName: "user",
      unfocusedName: "user",
    },
  },
  SettingsScreen: {
    label: "Settings",
    icon: {
      focusedVariant: "Feather",
      unfocusedVariant: "Feather",
      focusedName: "settings",
      unfocusedName: "settings",
    },
  },
};
