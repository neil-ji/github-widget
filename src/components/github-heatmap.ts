import { LitElement, html, PropertyValueMap } from "lit";
import { customElement, queryAsync, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { Constant, getCssUnit } from "../utils";
import * as echarts from "echarts";

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
  @property({ type: Array }) data: Array<[string, number]>;
  @property({ type: Array }) color?: Array<string>;

  constructor() {
    super();
    if (!this.height) {
      this.height = Constant.default.HEATMAP_DEFAULT_HEIGHT;
    }
    if (!this.width) {
      this.width = Constant.default.HEATMAP_DEFAULT_WIDTH;
    }
    this.data = [];
  }

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    this.rootContainer.then((root) => {
      echarts.init(root).setOption<echarts.EChartsOption>({
        color: this.color,
        tooltip: {
          valueFormatter: (value: any) => `${value} contributions`,
          showDelay: 200,
        },
        visualMap: {
          pieces: [
            // { min: 0, max: 0 },
            { min: 1, max: 3 },
            { min: 3, max: 6 },
            { min: 7, max: 20 },
            { min: 21, max: 40 },
            { min: 41, max: 70 },
            { min: 71 },
          ],
          type: "piecewise",
          orient: "horizontal",
          left: "center",
          top: 0,
        },
        calendar: {
          top: 60,
          left: 30,
          right: 30,
          cellSize: [16],
          range: "2023",
          itemStyle: {
            borderWidth: 1,
          },
          splitLine: {
            show: false,
          },
          yearLabel: { show: false },
        },
        series: {
          type: "heatmap",
          coordinateSystem: "calendar",
          data: this.data,
        },
      });
    });
  }

  render() {
    const styles = {
      height: this.height,
      width: this.width,
    };
    return html` <div style=${styleMap(styles)} id="root"></div> `;
  }
}
