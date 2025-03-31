import { db } from "@/db";
import { spaces } from "@/db/schema";
import { useState } from "react";
import { ActivityIndicator, Button, SafeAreaView, Text } from "react-native";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);

  const seedDatabase = async () => {
    setLoading(true);
    await db.delete(spaces).execute();

    await db
      .insert(spaces)
      .values([
        {
          id: 1,
          name: "Home",
          icon: "🏡",
          colorHex: "#3357FF",
        },
        {
          id: 2,
          name: "Vacation",
          icon: "🏖️",
          colorHex: "#facc15",
        },
        {
          id: 3,
          name: "Car",
          icon: "🚗",
          colorHex: "#dc2626",
        },
      ])
      .execute();

    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Profile Page</Text>

      <Button onPress={() => seedDatabase()} title="Seed Database" />

      {loading && <ActivityIndicator />}
    </SafeAreaView>
  );
}
