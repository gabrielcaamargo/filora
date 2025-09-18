export {};

jest.mock("react-native-keyboard-controller", () =>
  require("react-native-keyboard-controller/jest")
);

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { View } = require("react-native");
  const { TestIds } = require("@test");

  function MockIcon() {
    return <View testID={TestIds.ICON} />;
  }

  return {
    AntDesign: MockIcon,
    Entypo: MockIcon,
    EvilIcons: MockIcon,
    Feather: MockIcon,
    FontAwesome: MockIcon,
    FontAwesome5: MockIcon,
    Fontisto: MockIcon,
    Foundation: MockIcon,
    Ionicons: MockIcon,
    MaterialCommunityIcons: MockIcon,
    MaterialIcons: MockIcon,
    Octicons: MockIcon,
    SimpleLineIcons: MockIcon,
    Zocial: MockIcon,
  };
});
