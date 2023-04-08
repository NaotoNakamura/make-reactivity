import nodeOps from "./nodeOps.js";
import { createVNode, patch } from "./renderer.js";
import { reactive, computed, effect } from "./reactivity.js";

const createApp = (args) => {
  const { data, render } = args;
  const app = {};
  app.data = reactive(data());
  app.mount = (selector) => {
    const container = nodeOps.qs(selector);
    app.vnode = createVNode();
    effect(() => {
      const nextVNode = render.call(app);
      patch(app.vnode, nextVNode, container);
      app.vnode = nextVNode;
    });
  };
  return app;
};

export { createApp, createVNode as h };
