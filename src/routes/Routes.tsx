import { NavigationContainer } from "@react-navigation/native";
import { AuthStackNavigation } from "./AuthStackNavigation";
import { useUserSlice } from "@store";
import { AppStackNavigation } from "./AppStackNavigation";

export function Routes() {
  const { data: user } = useUserSlice();

  return (
    <NavigationContainer>
      {user.id ? <AppStackNavigation /> : <AuthStackNavigation />}
    </NavigationContainer>
  );
}
