import "../global.css";

import { db } from "@/db";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { SplashScreen, Stack } from "expo-router";
import { verifyInstallation } from "nativewind";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import migrations from "../drizzle/migrations";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  verifyInstallation();

  if (!success) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
        }}
      >
        <Text style={{ color: "white" }}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="add"
            options={{
              presentation: "transparentModal",
              headerShown: false,
              animation: "fade",
            }}
          />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
