import { Button, Screen, Text } from "@components";
import { useUserSlice } from "@store";
import { themedStyleSheet } from "@theme";
import { View } from "react-native";
import { EditableInfo } from "./components/EditableInfo";
import { useLogOutUseCase } from "@domain";

export function ProfileScreen() {
  const { user } = useUserSlice();
  const { logOut, isPending } = useLogOutUseCase({});

  console.log(user?.createdAt);

  return (
    <Screen title="Perfil">
      <View style={styles.header}>
        <View style={styles.profilePicturePlaceholder} />
        <EditableInfo
          title={user?.fullName ?? ""}
          textProps={{ weight: "SemiBold", preset: "headingSmall" }}
          onPressEdit={() => alert("Editar")}
        />
      </View>

      <View style={styles.spacer} />

      <Button title="Sair da conta" onPress={logOut} disabled={isPending} />
    </Screen>
  );
}

const styles = themedStyleSheet(({ spacing, colors }) => ({
  header: {
    gap: spacing.s12,
    marginBottom: spacing.s6,
  },

  profilePicturePlaceholder: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: colors.grayLight,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.s8,
  },

  spacer: {
    flex: 1,
  },
}));
