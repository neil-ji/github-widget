import { LitElement, html } from "lit";
import { customElement, queryAsync, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { Constant, getCssUnit } from "../utils";
import * as echarts from "echarts";

function getVirtualData(year: string) {
  const date = +echarts.time.parse(year + "-01-01");
  const end = +echarts.time.parse(+year + 1 + "-01-01");
  const dayTime = 3600 * 24 * 1000;
  const data: [string, number][] = [];
  for (let time = date; time < end; time += dayTime) {
    data.push([
      echarts.time.format(time, "{yyyy}-{MM}-{dd}", false),
      Math.floor(Math.random() * 10000),
    ]);
  }
  return data;
}

// TODO: Extract as shared util function.
function customProperty(defaultValue: any) {
  return property({
    converter: (value) => getCssUnit(value, defaultValue),
  });
}

@customElement("github-heatmap")
export class GithubHeatmap extends LitElement {
  @customProperty(Constant.default.HEATMAP_DEFAULT_WIDTH) width!: string;
  @customProperty(Constant.default.HEATMAP_DEFAULT_HEIGHT) height!: string;
  @queryAsync("#root") rootContainer!: Promise<HTMLElement>;

  constructor() {
    super();
    if (!this.height) {
      this.height = Constant.default.HEATMAP_DEFAULT_HEIGHT;
    }
    if (!this.width) {
      this.width = Constant.default.HEATMAP_DEFAULT_WIDTH;
    }
  }

  firstUpdated() {
    this.rootContainer.then(
      (root) => {
        if (root) {
          const myChart = echarts.init(root);
          myChart.setOption({
            title: {
              top: 30,
              left: "center",
              text: "Daily Step Count",
            },
            tooltip: {},
            visualMap: {
              min: 0,
              max: 10000,
              type: "piecewise",
              orient: "horizontal",
              left: "center",
              top: 65,
            },
            calendar: {
              top: 120,
              left: 30,
              right: 30,
              cellSize: ["auto", 13],
              range: "2016",
              itemStyle: {
                borderWidth: 0.5,
              },
              yearLabel: { show: false },
            },
            series: {
              type: "heatmap",
              coordinateSystem: "calendar",
              data: getVirtualData("2016"),
            },
          });
        }
      },
      (error) => console.log(error)
    );
  }

  render() {
    const styles = {
      height: this.height,
      width: this.width,
    };
    return html` <div style=${styleMap(styles)} id="root"></div> `;
  }
}
