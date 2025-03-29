import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, Tabs } from "expo-router";
import { DiamondPlusIcon, UserIcon, WalletIcon } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function TabsLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs tabBar={TabBar} screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="home" />
        <Tabs.Screen name="profile" />
        <Tabs.Screen name="index" options={{ href: null }} />
      </Tabs>
    </>
  );
}

const TabBar = ({ navigation }: BottomTabBarProps) => {
  return (
    <View style={bottomBarStyle.tabBarContainer}>
      {/* Fading gradient effect */}
      <LinearGradient
        colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
        locations={[0, 0.8]}
        style={StyleSheet.absoluteFill}
      />
      <View style={bottomBarStyle.tabBar}>
        <TouchableOpacity
          style={bottomBarStyle.button}
          onPress={() => navigation.navigate("home")}
        >
          <WalletIcon color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[bottomBarStyle.button, bottomBarStyle.primaryButton]}
          onPress={() => navigation.navigate("add/index")}
        >
          <DiamondPlusIcon color="black" size={28} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("profile")}
          style={bottomBarStyle.button}
        >
          <UserIcon color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const bottomBarStyle = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    alignItems: "center",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120, // Adjust to control the blur/fade effect
  },
  tabBar: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 48,
  },

  button: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },

  primaryButton: {
    width: 58,
    height: 58,
    borderRadius: 12,
  },
});
