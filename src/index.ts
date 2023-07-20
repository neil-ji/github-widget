import { fetchDataForAllYears } from "./api";
import "./components";
import "./index.css";

const root = document.createElement("div");

root.innerHTML = "<github-heatmap></github-heatmap>";

root.setAttribute("style", "height: 100%; width: 100%;");

document.body.appendChild(root);
