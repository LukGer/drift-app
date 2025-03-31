import HomeExpenseListItem from "@/components/expenses/HomeListItem";
import SpacesEmptyState from "@/components/spaces/EmptyState";
import HomeSpaceListItem from "@/components/spaces/HomeSpaceListItem";
import { useExpenses } from "@/hooks/expenses";
import { useSpaces } from "@/hooks/spaces";
import { getGreeting } from "@/utils/greeting";
import { SplashScreen, Stack } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const EmptyStateImage = require("../../../assets/images/empty_state.png");

export default function HomePage() {
  const [spaceId, setSpaceId] = useState<number | null>(null);
  const [greeting, setGreeting] = useState<string>("");

  const spaces = useSpaces();
  const expenses = useExpenses(spaceId);

  const onLayout = useCallback(() => {
    SplashScreen.hide();
  }, []);

  const onSpacePressed = (newSpaceId: number) => {
    if (spaceId === newSpaceId) {
      setSpaceId(null);
    } else {
      setSpaceId(newSpaceId);
    }
  };

  const time = new Date();
  const name = "Lukas";

  useEffect(() => {
    const greeting = getGreeting(time, name);
    setGreeting(greeting);
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: greeting,
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: "systemChromeMaterial",
          headerLargeTitleShadowVisible: false,
          headerShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: "transparent",
          },
        }}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#F6F7F7",
        }}
        onLayout={onLayout}
      >
        <View className="flex flex-row items-center gap-4">
          {spaces.isSuccess &&
            (spaces.data.length === 0 ? (
              <TouchableOpacity>
                <SpacesEmptyState />
              </TouchableOpacity>
            ) : (
              <FlatList
                horizontal={true}
                data={spaces.data}
                contentContainerClassName="gap-2 px-4"
                renderItem={({ item }) => (
                  <HomeSpaceListItem
                    space={item}
                    onPress={() => onSpacePressed(item.id)}
                  />
                )}
              />
            ))}
        </View>

        <View className="flex-1">
          {expenses.isSuccess &&
            (expenses.data.length === 0 ? (
              <EmptyState />
            ) : (
              <FlatList
                scrollEnabled={false}
                data={expenses.data}
                renderItem={({ item }) => (
                  <HomeExpenseListItem expense={item} />
                )}
              />
            ))}
        </View>
      </ScrollView>
    </>
  );
}

const EmptyState = () => {
  return (
    <View className="flex-1 flex flex-col gap-2 items-center justify-center">
      <Image
        source={EmptyStateImage}
        style={{
          width: 300,
          height: 300,
          marginTop: 60,
        }}
        resizeMode="contain"
      />
      <Text className="font-bold text-3xl font-nunito">So empty ...</Text>
      <Text className="text-gray-500 font-nunito text-lg">
        Start by adding new expenses
      </Text>
    </View>
  );
};
