import DriftModal from "@/components/modal";
import SpaceListItem from "@/components/SpaceListItem";
import { DbExpense } from "@/db/schema";
import { useExpenses } from "@/hooks/expenses";
import { useSpaces } from "@/hooks/spaces";
import { SplashScreen, Tabs } from "expo-router";
import React, { useCallback, useState } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function HomePage() {
  const [spaceId, setSpaceId] = useState<number | null>(null);

  const spaces = useSpaces();
  const expenses = useExpenses(spaceId);

  const onLayout = useCallback(() => {
    SplashScreen.hide();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Tabs.Screen
        options={{
          title: "Home",
        }}
      />

      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
        }}
        onLayout={onLayout}
      >
        <DriftModal isVisible={modalOpen} onClose={() => setModalOpen(false)}>
          <View className="bg-white flex flex-col items-center gap-2 p-4">
            <Text>Text 1</Text>
            <Text>Text 2</Text>
            <Text>Text 3</Text>
            <Text>Text 3</Text>
            <Text>Text 3</Text>
            <Text>Text 3</Text>
            <Text>Text 3</Text>
          </View>
        </DriftModal>
        <View>
          {spaces.isSuccess && (
            <FlatList
              horizontal={true}
              data={spaces.data}
              renderItem={({ item }) => <SpaceListItem space={item} />}
            />
          )}
        </View>

        <Button title="Open modal" onPress={() => setModalOpen(!modalOpen)} />

        <View className="flex-1">
          {expenses.isSuccess && (
            <FlatList
              scrollEnabled={false}
              data={expenses.data}
              renderItem={({ item }) => <ExpenseListItem expense={item} />}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const ExpenseListItem = ({ expense }: { expense: DbExpense }) => {
  return (
    <View>
      <Text>{expense.description}</Text>
    </View>
  );
};
