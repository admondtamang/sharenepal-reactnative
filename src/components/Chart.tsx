import React from "react";
import { View, Text } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

export default function Chart() {
  const victorData = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];
  return (
    <View>
      <Text>chart</Text>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryBar data={victorData} x="quarter" y="earnings" />
      </VictoryChart>
    </View>
  );
}
