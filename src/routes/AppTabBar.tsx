import { useAppSafeArea, useTheme } from "@hooks";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { themedStyleSheet } from "@theme";
import { Pressable, View } from "react-native";
import { mapTabScreen } from "./mapTabScreen";
import { Icon, Text } from "@components";
import { AppTabParamList } from "./AppTabNavigation";

export function AppTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { bottom } = useAppSafeArea();
  const { spacing } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: bottom, paddingHorizontal: spacing.s8 },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const tabItem = mapTabScreen[route.name as keyof AppTabParamList];

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              name: route.name,
              params: route.params,
              merge: true,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}
            style={[styles.tabItem]}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
          >
            <Icon
              size={24}
              variant={
                isFocused
                  ? tabItem.icon.focusedVariant
                  : tabItem.icon.unfocusedVariant
              }
              name={
                isFocused
                  ? tabItem.icon.focusedName
                  : tabItem.icon.unfocusedName
              }
              color={isFocused ? "primaryColor" : "textColor"}
            />

            <Text color={isFocused ? "primaryColor" : "textColor"}>
              {tabItem.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = themedStyleSheet(({ spacing, colors }) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 5,
    elevation: 6,
    paddingTop: spacing.s8,
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.s4,
  },
}));
