const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(projectRoot);

config.resolver.sourceExts.push("sql");

module.exports = withNativeWind(config, { input: "./global.css" });
