import "./components";
import "./index.css";
import * as echarts from "echarts";

const date = +echarts.time.parse("2023" + "-01-01");
const dayTime = 3600 * 24 * 1000;
const end = +echarts.time.parse(2023 + 1 + "-01-01");

const data = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0,
  0, 0, 2, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 4, 1, 0,
  0, 0, 1, 1, 1,
].map((item, index) => {
  return [
    echarts.time.format(date + dayTime * index, "{yyyy}-{MM}-{dd}", false),
    item,
  ];
});

// function getVirtualData(year: string = "2023") {
//   const date = +echarts.time.parse(year + "-01-01");
//   const end = +echarts.time.parse(+year + 1 + "-01-01");
//   const dayTime = 3600 * 24 * 1000;
//   const data: [string, number][] = [];
//   for (let time = date; time < end; time += dayTime) {
//     data.push([
//       echarts.time.format(time, "{yyyy}-{MM}-{dd}", false),
//       Math.floor(Math.random() * 10000),
//     ]);
//   }
//   return data;
// }

const heatmap = document.createElement("github-heatmap");
(heatmap as any).data = data;

const root = document.createElement("div");
root.appendChild(heatmap);
root.setAttribute("style", "height: 100%; width: 100%;");

document.body.appendChild(root);
