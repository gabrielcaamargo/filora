import { KeyboardStickyView } from "react-native-keyboard-controller";
import { ScrollViewContainer, ViewContainer } from "./Container";
import { spacing, theme, themedStyleSheet } from "@theme";
import { Pressable, ScrollViewProps, View, ViewProps } from "react-native";
import { useAppSafeArea } from "@hooks";
import { TestIds } from "@test";
import { Text } from "../Text/Text";
import { Icon } from "../Icon/Icon";
import { useNavigation } from "@react-navigation/native";

interface ScreenProps {
  /**
   * Whether to apply vertical insets to the screen.
   * @default true
   */
  hasVerticalInsets?: boolean;
  /**
   * Whether to make the screen scrollable.
   * If true, the wrapper will be a ScrollView if not it will be a View.
   * @default false
   */
  scrollable?: boolean;

  /**
   * Whether to apply horizontal padding to the screen.
   * @default true
   */
  withHorizontalPadding?: boolean;

  /**
   * Whether to show the back button in the screen.
   * @default false
   */
  canGoBack?: boolean;

  /**
   * The title of the screen.
   * @default undefined
   */
  title?: string;
}

const scrollViewProps: ScrollViewProps = {
  bounces: false,
  keyboardShouldPersistTaps: "handled",
  showsVerticalScrollIndicator: false,
  style: {
    backgroundColor: theme.colors.backgroundColor,
  },
  contentContainerStyle: {
    paddingBottom: spacing.s16,
  },
};

const viewProps: ViewProps = {
  style: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
  },
};

/**
 * Basic screen component that provides the basic structure for a screen including insets and safe area.
 */
export function Screen({
  scrollable = false,
  hasVerticalInsets = true,
  withHorizontalPadding = true,
  canGoBack = false,
  title,
  children,
}: React.PropsWithChildren<ScreenProps>) {
  const Container = scrollable ? ScrollViewContainer : ViewContainer;
  const { top } = useAppSafeArea();
  const navigation = useNavigation();
  return (
    <KeyboardStickyView style={styles.container}>
      <Container scrollViewProps={scrollViewProps} viewProps={viewProps}>
        <View
          testID={TestIds.SCREEN_VIEW_CONTENT}
          style={[
            withHorizontalPadding && styles.content,
            { paddingTop: hasVerticalInsets ? top : 0 },
          ]}
        >
          {canGoBack && (
            <Pressable
              onPress={navigation.goBack}
              style={styles.header}
              testID={TestIds.SCREEN_BACK_BUTTON}
            >
              <Icon
                variant="Feather"
                name="arrow-left"
                color="secondaryColor"
              />
              <Text weight="SemiBold" color="secondaryColor">
                Voltar
              </Text>
            </Pressable>
          )}
          {title && (
            <View style={styles.contentContainer}>
              <Text preset="headingLarge" weight="Bold" color="primaryColor">
                {title}
              </Text>
            </View>
          )}
          {children}
        </View>
      </Container>
    </KeyboardStickyView>
  );
}

const styles = themedStyleSheet(({ spacing }) => ({
  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: spacing.s20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.s8,
    marginBottom: spacing.s16,
  },

  contentContainer: {
    marginBottom: spacing.s16,
  },
}));
