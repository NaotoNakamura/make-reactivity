import { createVNode, patch } from "./renderer.js";
import { nodeOps } from "./nodeOps.js";

const container = nodeOps.qs("#app");
const prevVNode = createVNode();
const nextVnode = createVNode(
  "div",
  {
    class: "green",
    onClick: () => {
      console.log("Hello");
    },
  },
  "Hello"
);
patch(prevVNode, nextVnode, container);
