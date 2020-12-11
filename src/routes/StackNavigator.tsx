import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import Portfolio from "../screens/Portfolio";
import Login from "../screens/Login";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function StackNavigator() {
  function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

    // const routeName = route.state
    //   ? route.state.routes[route.state.index].name
    //   : "home";
    switch (routeName) {
      case "Home":
        return `Today's share`;
      case "Portfolio":
        return `Portfolio`;
    }
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={({ route }) => ({
          title: getHeaderTitle(route),
        })}
        component={TabNavigator}
      />
      <Stack.Screen name="Portfolio" component={Portfolio} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
