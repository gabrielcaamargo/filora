import { Button, Screen, Text } from "@components";
import { useLogOutUseCase } from "@domain";
import { useUserSlice } from "@store";

export function HomeScreen() {
  const { user } = useUserSlice();

  const { logOut, isPending } = useLogOutUseCase({});

  return (
    <Screen title="Home">
      <Text>{JSON.stringify(user)}</Text>

      <Button title="Logout" onPress={logOut} disabled={isPending} />
    </Screen>
  );
}
