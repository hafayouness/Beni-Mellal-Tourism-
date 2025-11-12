import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="AttractionList" />
          <Stack.Screen
            name="details"
          
          />
          <Stack.Screen name="city" />
         <Stack.Screen name="favoris" />
         <Stack.Screen name="gallery" />


        </Stack>
      
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
