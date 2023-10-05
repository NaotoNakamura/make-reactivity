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
  [createVNode("div", {}, "Hello")]
);

/*
 * TODO: ノードのtypeが同じ場合もDOM更新できるようにする
 * 現状はtypeが同じだとel変数に値が入らずにエラーになってしまう
 */

// const nextVnode2 = createVNode(
//   "div",
//   {
//     class: "green",
//     onClick: () => {
//       console.log("Hello");
//     },
//   },
//   [createVNode("div", {}, "Bye")]
// );
patch(prevVNode, nextVnode, container);
// patch(nextVnode, nextVnode2, container);
