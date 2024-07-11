import { useContext, useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { StackedBarChart } from "react-native-chart-kit";
import { colors, fonts } from "../../../../../constance";
import { DepartmentStatisticContext } from "./DepartmentStatisticProvider";

export const Chart = () => {
  const { chartData, loading } = useContext(DepartmentStatisticContext);

  const [noThingToShow, setNoThingToShow] = useState(true);

  useEffect(() => {
    if (!chartData) {
      return;
    }
    setNoThingToShow(true);
    let data = chartData.data || [];
    data.forEach((item) => {
      if (Number(item[0]) + Number(item[0]) !== 0) {
        setNoThingToShow(false);
        return;
      }
    });
  }, [chartData]);

  return (
    !loading &&
    !!chartData && (
      <View style={{ borderRadius: 16, overflow: "hidden" }}>
        {!noThingToShow ? (
          <StackedBarChart
            data={chartData}
            width={Dimensions.get("window").width - 32} // from react-native
            height={220}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#ABDCFF",
              backgroundGradientTo: "#0396FF",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: colors.primary,
              },
            }}
          />
        ) : (
          <View
            style={{
              height: "90%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: fonts.BahnschriftBold, fontSize: 20}}>
              Khoa chưa nhận được câu hỏi nào
            </Text>
          </View>
        )}
      </View>
    )
  );
};
