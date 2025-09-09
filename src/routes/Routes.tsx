import { NavigationContainer } from "@react-navigation/native";
import { AuthStackNavigation } from "./AuthStackNavigation";

export function Routes() {
  return (
    <NavigationContainer>
      <AuthStackNavigation />
    </NavigationContainer>
  );
}
