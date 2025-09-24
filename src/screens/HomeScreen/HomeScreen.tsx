import { Button, Screen, Text } from "@components";
import { User } from "@domain";
import { MMKVStorage, storage } from "@storage";
import { useUserSlice } from "@store";
import { useEffect } from "react";

export function HomeScreen() {
  const { user, clearUser } = useUserSlice();

  return (
    <Screen title="Home">
      <Text>{JSON.stringify(user)}</Text>

      <Button title="Logout" onPress={() => clearUser()} />
    </Screen>
  );
}
