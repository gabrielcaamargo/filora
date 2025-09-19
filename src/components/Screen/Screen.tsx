import { KeyboardStickyView } from "react-native-keyboard-controller";
import { ScrollViewContainer, ViewContainer } from "./Container";
import { spacing, themedStyleSheet } from "@theme";
import { ScrollViewProps, View, ViewProps } from "react-native";
import { useAppSafeArea } from "@hooks";
import { TestIds } from "@test";

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
}

const scrollViewProps: ScrollViewProps = {
  bounces: false,
  keyboardShouldPersistTaps: "handled",
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: spacing.s16,
  },
};

const viewProps: ViewProps = {
  style: {
    flex: 1,
  },
};

/**
 * Basic screen component that provides the basic structure for a screen including insets and safe area.
 */
export function Screen({
  scrollable = false,
  hasVerticalInsets = true,
  withHorizontalPadding = true,
  children,
}: React.PropsWithChildren<ScreenProps>) {
  const Container = scrollable ? ScrollViewContainer : ViewContainer;
  const { top } = useAppSafeArea();

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
}));
