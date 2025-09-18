module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "module-resolver",
      {
        root: ".",
        alias: {
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@hooks": "./src/hooks",
          "@routes": "./src/routes",
          "@screens": "./src/screens",
          "@theme": "./src/theme",
          "@domain": "./src/domain",
          "@types": "./src/types",
          "@utils": "./src/utils",
          "@test": "./src/test",
        },
      },
    ],
    "react-native-worklets/plugin",
  ],
};
