import Axios from "axios";
import React, { useState, useRef } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  View,
  AsyncStorage,
} from "react-native";
import { DataTable } from "react-native-paper";
import { QueryCache, useQuery, setConsole } from "react-query";
import BottomSheet from "reanimated-bottom-sheet";
import { Dimensions } from "react-native";
// import { LineChart } from "react-native-chart-kit";
import Chart from "../components/Chart";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addShare } from "../redux/share/shareAction";

export default function Home() {
  const dispatch = useDispatch();

  const screenWidth = Dimensions.get("window").width;
  // const chartConfig = {
  //   backgroundGradientFrom: "#1E2923",
  //   backgroundGradientTo: "#08130D",
  //   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  // };
  // const chartData = {
  //   labels: ["January", "February", "March", "April", "May", "June"],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 80, 99, 43],
  //     },
  //   ],
  // };

  const sheetRef = useRef(null);
  const [share, setShare] = useState({});

  // const queryCache = new QueryCache();
  const { isLoading, error, data } = useQuery("shareData", () =>
    Axios.get("http://nepstockapi.herokuapp.com/")
  );
  AsyncStorage.setItem("shareData", data);

  // setConsole({
  //   log: console.log,
  //   warn: console.warn,
  //   error: console.warn,
  // });s

  if (isLoading) return <Text>Loading...</Text>;

  if (error) return <Text>{error.message}</Text>;

  const renderContent = () => (
    <View
      style={
        (styles.header,
        {
          paddingTop: 10,
          backgroundColor: "white",
          height: 750,
        })
      }
    >
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
      <View>
        <Text>{share.Symbol}</Text>

        {/* <LineChart
          data={chartData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        /> */}

        {/* <Chart /> */}
        <View style={{ height: 80, width: "90%" }}>
          <Text>{share.High}</Text>

          <Text>{share.Low}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <DataTable>
            <DataTable.Header style={{}}>
              <DataTable.Title>S.N</DataTable.Title>
              <DataTable.Title sortDirection="ascending">
                Symbol
              </DataTable.Title>
              <DataTable.Title numeric>High</DataTable.Title>
              <DataTable.Title numeric>Low</DataTable.Title>
              <DataTable.Title numeric>Close</DataTable.Title>
              <DataTable.Title numeric>Change</DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={data?.data}
              renderItem={({ item }) => (
                <DataTable.Row
                  style={{
                    backgroundColor: item.Diff > 0 ? "green" : "red",
                    color: "white",
                  }}
                  onPress={() => {
                    sheetRef.current.snapTo(0);
                    setShare(item);
                    dispatch(addShare(item));
                  }}
                >
                  <DataTable.Cell>{item["S.No"]}</DataTable.Cell>
                  <DataTable.Cell>{item.Symbol}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.High}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.Low}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.Close}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {item.Diff}
                    {item.Diff < 0 ? (
                      <AntDesign name="caretdown" size={15} color="white" />
                    ) : (
                      <AntDesign name="caretup" size={15} color="white" />
                    )}
                  </DataTable.Cell>
                </DataTable.Row>
              )}
            />
          </DataTable>
        </View>
      </ScrollView>
      {/* <BottomSheet
        ref={sheetRef}
        // snapPoints={[540, 300, 0]}
        snapPoints={[140, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
      /> */}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
});
//
