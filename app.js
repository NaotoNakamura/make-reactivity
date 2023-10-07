import { nodeOps } from "./nodeOps.js";
import { createVNode, patch } from "./renderer.js";
import { reactive, effect, computed } from "./reactivity.js";

function createApp(args) {
  const { data, render, computed: computedData, methods } = args;
  const app = {};
  app.methods = methods;
  app.data = reactive(data());
  app.computed = {};
  for (const prop in computedData) {
    const c = computed(computedData[prop], app);
    app.computed[prop] = c;
  }
  app.mount = function (selector) {
    const container = nodeOps.qs(selector);
    app.vnode = createVNode();
    effect(() => {
      const nextVNode = render.call(app);
      patch(app.vnode, nextVNode, container);
      app.vnode = nextVNode;
    });
  };
  return app;
}

export { createApp, createVNode as h };
