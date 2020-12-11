import React from "react";
import { StyleSheet, Text, View, LogBox } from "react-native";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import Route from "./src/routes/StackNavigator";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/redux/store";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};

const queryCache = new QueryCache();
export default function App() {
  // LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
  return (
    <Provider store={store}>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Route />
          </NavigationContainer>
        </PaperProvider>
      </ReactQueryCacheProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
