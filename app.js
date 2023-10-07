import { nodeOps } from "./nodeOps.js";
import { createVNode, patch } from "./renderer.js";
import { reactive, effect } from "./reactivity.js";

function createApp(args) {
  const { data, render } = args;
  const app = {};
  app.data = reactive(data());
  app.mount = function (selector) {
    const container = nodeOps.qs(selector);
    const prevVNode = createVNode();
    effect(() => {
      const nextVNode = render.call(app);
      patch(prevVNode, nextVNode, container);
    });
  };
  return app;
}

export { createApp, createVNode as h };
