import { reactive, effect, computed } from "./reactivity.js";
import { createVNode, patch } from "./renderer.js";
import nodeOps from "./nodeOps.js";

const container = nodeOps.qs("#app");
const prevVNode = createVNode();
const nextVNode1 = createVNode(
  "div",
  {
    class: "demo",
  },
  "Hello"
);
const nextVNode2 = createVNode(
  "div",
  {
    class: "demo",
  },
  "Bye"
);
patch(prevVNode, nextVNode1, container);
patch(nextVNode1, nextVNode2, container);
