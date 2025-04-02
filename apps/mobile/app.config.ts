import { IOSIcons } from "@expo/config-types";
import { ConfigContext, ExpoConfig } from "expo/config";

const IS_DEV = process.env.APP_VARIANT === "dev";
const IS_PREVIEW = process.env.APP_VARIANT === "pre";

const getAppName = () => {
  if (IS_DEV) {
    return "Drift - DEV";
  }

  if (IS_PREVIEW) {
    return "Drift - PRE";
  }

  return "Drift";
};

const getUniqueBundleId = () => {
  if (IS_DEV) {
    return "dev.lukger.drift.dev";
  }

  if (IS_PREVIEW) {
    return "dev.lukger.drift.pre";
  }

  return "dev.lukger.drift";
};

const getAppScheme = () => {
  if (IS_DEV) {
    return "drift-dev";
  }

  if (IS_PREVIEW) {
    return "drift-pre";
  }

  return "drift-app";
};

const getAppIcons = (): IOSIcons => {
  if (IS_DEV) {
    return {
      dark: "./assets/icons/dev/ios-dark.png",
      light: "./assets/icons/dev/ios-light.png",
      tinted: "./assets/icons/dev/ios-tinted.png",
    };
  }

  if (IS_PREVIEW) {
    return {
      dark: "./assets/icons/pre/ios-dark.png",
      light: "./assets/icons/pre/ios-light.png",
      tinted: "./assets/icons/pre/ios-tinted.png",
    };
  }

  return {
    dark: "./assets/icons/ios-dark.png",
    light: "./assets/icons/ios-light.png",
    tinted: "./assets/icons/ios-tinted.png",
  };
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "drift",
  version: "1.0.0",
  orientation: "portrait",
  scheme: getAppScheme(),
  userInterfaceStyle: "light",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: getUniqueBundleId(),
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    icon: getAppIcons(),
  },
  web: {
    bundler: "metro",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/icons/splash-icon-dark.png",
        backgroundColor: "#ffffff",
        imageWidth: 200,
        resizeMode: "contain",
        dark: {
          image: "./assets/icons/splash-icon-light.png",
          backgroundColor: "#000000",
        },
      },
    ],
    "expo-sqlite",
    "@bacons/apple-colors",
    [
      "expo-font",
      {
        fonts: [
          "assets/fonts/Nunito-Italic-VariableFont_wght.ttf",
          "assets/fonts/Nunito-VariableFont_wght.ttf",
        ],
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "82ef2f68-a3c8-447a-9061-7aadbccb7940",
    },
  },
  owner: "lukger",
});
