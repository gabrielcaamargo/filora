import { Screen, Text } from "@components";
import { useUserSlice } from "@store";

export function HomeScreen() {
  const { data: user } = useUserSlice();
  return (
    <Screen title="Home">
      <Text>{user.fullName}</Text>
    </Screen>
  );
}
