<template>
  <h1>Аналитика</h1>
  <h2>Аналитика во визитам</h2>
  <div class="hello" ref="chartdiv"></div>
</template>

<script setup>
import {onMounted, ref, shallowRef} from 'vue'
import {useRouter} from 'vue-router'
import {dataTest} from '../utils/data'
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated.js';


const router = useRouter()


let root;
const chartdiv = shallowRef(null);

onMounted(() => {
    if (!localStorage.getItem('leadhit-site-id')) {
   router.push('/')
}



// Create root and chart
root = am5.Root.new(chartdiv.value);

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push( 
  am5xy.XYChart.new(root, {
    panY: false,
    wheelY: "zoomX",
    layout: root.verticalLayout,
    maxTooltipDistance: 0
  }) 
);


// Define data


const data = dataTest.map((obj) => {
    const date = new Date(obj.date)
    console.log(date.getTime())
    return {...obj,date:date.getTime()}
})

console.log(data)

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
   
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

xAxis.get("dateFormats")["day"] = "dd/MM";
xAxis.get("periodChangeDateFormats")["day"] = "dd/MM";

// Create series
function createSeries(name, field) {
  var series = chart.series.push( 
    am5xy.LineSeries.new(root, { 
      name: name,
      xAxis: xAxis, 
      yAxis: yAxis, 
      valueYField: field, 
      valueXField: 'date',
      tooltip: am5.Tooltip.new(root, {
    pointerOrientation: "right",
    labelText: "[bold]{name}[/]\n{valueX.formatDate('dd.M')}: {valueY}"
  }),
      maskBullets: false
    }) 
  );
  
  series.bullets.push(function() {
    return am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: am5.color('#9500fc')
      })
    });
  });
  
  
  series.strokes.template.set("strokeWidth", 2);
  
  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate(): {valueY}")
  series.data.setAll(data);
}

createSeries("Кол-во посещений", "visits",'date');

// Add cursor
chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "zoomXY",
  xAxis: xAxis
}));


})
</script>

<style scoped>
.hello {
    width: 500px;
    height: 500px;
}
</style>