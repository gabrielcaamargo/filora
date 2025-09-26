import { TextProps, Text, Icon } from "@components";
import { themedStyleSheet } from "@theme";
import { View } from "react-native";

type EditableInfoProps = {
  title: string;
  onPressEdit: () => void;
  textProps?: TextProps;
};

export function EditableInfo({
  title,
  onPressEdit,
  textProps,
}: EditableInfoProps) {
  return (
    <View style={styles.container}>
      <Text {...textProps}>{title}</Text>

      <Icon
        variant="Feather"
        name="edit-2"
        onPressIcon={onPressEdit}
        size={16}
        color="primaryColor"
      />
    </View>
  );
}

const styles = themedStyleSheet(({ spacing }) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.s8,
    justifyContent: "space-between",
  },
}));
