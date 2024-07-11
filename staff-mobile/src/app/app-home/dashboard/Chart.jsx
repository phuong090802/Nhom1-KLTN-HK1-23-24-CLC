import React, { useContext } from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { colors } from "../../../../constance";
import { DashboardContext } from "./DashboardProvider";

export const Chart = () => {
  const { chartData } = useContext(DashboardContext);

  return (
    !!chartData && (
      <View style={{ overflow: "hidden" }}>
        <LineChart
          data={chartData}
          width={Dimensions.get("window").width -32} // from react-native
          height={240}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#0396FF",
            backgroundGradientTo: "#ABDCFF",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style:{
              paddingTop: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: colors.white,
            },
          }}
          bezier
          style={{
            // marginBottom: 16,
            borderRadius: 16,
          }}
        />
      </View>
    )
  );
};
