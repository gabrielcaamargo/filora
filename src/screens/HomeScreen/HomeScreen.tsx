import { Screen, Text } from "@components";
import { useUserSlice } from "@store";
import { useGetUserProfileUseCase } from "src/domain/Auth/useCases/useGetUserProfileUseCase";

export function HomeScreen() {
  const { data: user } = useUserSlice();
  const { data } = useGetUserProfileUseCase();

  return (
    <Screen title="Home">
      <Text>{user.fullName}</Text>
    </Screen>
  );
}
