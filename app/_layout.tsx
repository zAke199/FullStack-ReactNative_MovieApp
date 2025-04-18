import { Stack } from "expo-router";
import { StatusBar, Platform } from "react-native";
import './globals.css';

export default function RootLayout() {
  return (
      <>
        {Platform.OS === 'android' && (
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />
        )}
        <Stack>
          <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="movies/[id]"
              options={{ headerShown: false }}
          />
        </Stack>
      </>
  );
}
