import "./components";
import "./index.css";

// create web components instance and set the initial data.
const heatmap = document.createElement("github-heatmap");
(heatmap as any).data = [];

// append component into root
const root = document.createElement("div");
root.appendChild(heatmap);
root.setAttribute("style", "height: 100%; width: 100%;");

// append root into body
document.body.appendChild(root);
