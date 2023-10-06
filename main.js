import { createApp, h } from "./app.js";

createApp({
  render() {
    return h("div", {}, "hello");
  },
}).mount("#app");
