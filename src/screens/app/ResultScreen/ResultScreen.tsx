import { Button, Icon, Screen, Text } from "@components";
import { AuthScreenProps } from "@routes";
import { TestIds } from "@test";
import { ThemeColors, themedStyleSheet } from "@theme";
import { Dimensions, View } from "react-native";

export function ResultScreen({ route }: AuthScreenProps<"ResultScreen">) {
  const ICON_SIZE = Dimensions.get("screen").width * 0.4;
  const { type, title, message, buttonTitle, onAccept } = route.params;

  const mapResult: Record<
    typeof type,
    {
      icon: string;
      color: ThemeColors;
    }
  > = {
    success: {
      icon: "check",
      color: "success",
    },
    error: {
      icon: "x",
      color: "error",
    },
  };

  const resultType = mapResult[type];

  return (
    <Screen>
      <Icon
        name={resultType.icon}
        variant="Feather"
        color={resultType.color}
        size={ICON_SIZE}
        testID={TestIds.RESULT_SCREEN_ICON}
      />

      <View style={styles.contentContainer}>
        <Text preset="headingLarge" weight="Bold" color={resultType.color}>
          {title}
        </Text>

        <Text preset="paragraphLarge">{message}</Text>
      </View>
      <Button title={buttonTitle} onPress={onAccept} />
    </Screen>
  );
}

const styles = themedStyleSheet(({ colors, spacing }) => ({
  contentContainer: {
    marginTop: spacing.s16,
    gap: spacing.s8,
    flex: 1,
  },
}));
