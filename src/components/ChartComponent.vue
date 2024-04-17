<template>
  <div class="chart" ref="chartdiv" id="chartdiv"></div>
</template>

<script setup>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated.js";
import { shallowRef, onMounted, ref } from "vue";

let root;
const chartdiv = shallowRef(null);
const { data } = defineProps(["data"]);

onMounted(() => {
  root = am5.Root.new(chartdiv.value);

  root.setThemes([am5themes_Animated.new(root)]);

  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      layout: root.verticalLayout,
      maxTooltipDistance: 0,
    })
  );

  const dataGraphic = data.map((obj) => {
    const date = new Date(obj.date);
    return { ...obj, date: date.getTime() };
  });

  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      extraTooltipPrecision: 1,
      renderer: am5xy.AxisRendererY.new(root, {}),
    })
  );

  const xAxis = chart.xAxes.push(
    am5xy.DateAxis.new(root, {
      baseInterval: { timeUnit: "day", count: 1 },

      renderer: am5xy.AxisRendererX.new(root, {}),
    })
  );

  xAxis.get("dateFormats")["day"] = "dd.MM";
  xAxis.get("periodChangeDateFormats")["day"] = "dd.MM";

  function createSeries(field) {
    const tooltip = am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText:
        "Дата: {valueX.formatDate('dd.MM')}\nКол-во посещений: {valueY}",
    });

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: field,
        valueXField: "date",
        maskBullets: false,
        fill: am5.color("#e6c8fa"),
        stroke: am5.color("#9500fc"),
      })
    );

    series.set("tooltip", tooltip);

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: am5.color("#9500fc"),
        }),
      });
    });

    series.strokes.template.setAll({
      strokeWidth: 3,
    });
    series.fills.template.setAll({
      fillOpacity: 1,
      visible: true,
    });

    series.data.setAll(dataGraphic);
  }

  createSeries("visits");

  chart.set(
    "cursor",
    am5xy.XYCursor.new(root, {
      behavior: "zoomXY",
      xAxis: xAxis,
    })
  );
});
</script>

<style scoped>
.chart {
  width: 600px;
  height: 320px;
}
</style>
