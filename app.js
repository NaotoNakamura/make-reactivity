import { nodeOps } from "./nodeOps.js";
import { createVNode, patch } from "./renderer.js";

function createApp(args) {
  const { render } = args;
  const app = {};
  app.mount = function (selector) {
    const container = nodeOps.qs(selector);
    const prevVNode = createVNode();
    const nextVNode = render();
    patch(prevVNode, nextVNode, container);
  };
  return app;
}

export { createApp, createVNode as h };
