import { Button, Screen, Text } from "@components";
import { useUserSlice } from "@store";

export function HomeScreen() {
  const { user, clearUser } = useUserSlice();

  return (
    <Screen title="Home">
      <Text>{JSON.stringify(user)}</Text>

      <Button title="Logout" onPress={clearUser} />
    </Screen>
  );
}
