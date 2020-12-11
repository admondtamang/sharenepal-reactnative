import React from "react";
import { View, Text, StyleSheet, FlatList, AsyncStorage } from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { QueryCache, useQuery, setConsole } from "react-query";
import { DataTable } from "react-native-paper";
import Axios from "axios";

export default function Portfolio() {
  // const { isLoading, error, data } = useQuery("shareData", () =>
  //   Axios.get("http://nepstockapi.herokuapp.com/")
  // );

  const data = AsyncStorage.getItem("shareData");
  // if (isLoading) return <Text>Loading...</Text>;

  // if (error) return <Text>{error.message}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxContainer}>
        {/* <Text>Portfolio summary</Text> */}
        <View style={[styles.columns]}>
          <Text style={styles.text}>155</Text>
          <FontAwesome5
            name="money-bill"
            size={24}
            style={styles.icons}
            color="blue"
          />
          <Text> Total Investment</Text>
        </View>
        <View style={styles.columns}>
          <Text style={styles.text}>555</Text>

          <AntDesign
            name="pluscircle"
            size={24}
            style={styles.icons}
            color="green"
          />
          <Text> Profit</Text>
        </View>
        <View style={styles.columns}>
          <Text style={styles.text}>555</Text>
          <AntDesign
            name="checksquare"
            size={24}
            color="red"
            style={styles.icons}
          />
          <Text> Total Share</Text>
        </View>
      </View>

      <View style={styles.container}>
        <DataTable>
          <DataTable.Header style={{}}>
            <DataTable.Title>S.N</DataTable.Title>
            <DataTable.Title sortDirection="ascending">Symbol</DataTable.Title>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    marginHorizontal: 20,
    flexDirection: "column",
  },
  boxContainer: {
    // height: 150,
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    gap: 10,
  },
  columns: {
    width: "30%",
    textAlign: "center",
    justifyContent: "center",
  },
  icons: {
    margin: "3%",
    alignContent: "center",
  },
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
});
