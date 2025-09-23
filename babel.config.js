module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "module-resolver",
      {
        root: ".",
        alias: {
          "@assets": "./src/assets",
          "@api": "./src/api",
          "@components": "./src/components",
          "@hooks": "./src/hooks",
          "@lib": "./src/lib",
          "@routes": "./src/routes",
          "@screens": "./src/screens",
          "@theme": "./src/theme",
          "@domain": "./src/domain",
          "@types": "./src/types",
          "@utils": "./src/utils",
          "@store": "./src/store",
          "@test": "./src/test",
          "@database": "./src/database",
        },
      },
    ],
    "react-native-worklets/plugin",
  ],
};
