import { createApp, h } from "./app.js";

createApp({
  render() {
    return h("div", { class: "container" }, [
      h("div", { class: "num" }, [
        h("button", { class: "btn" }, "+"),
        h("div", { class: "label" }, 8),
        h("button", { class: "btn" }, "-"),
      ]),
      h("num", { class: "num" }, "+"),
      h("div", { class: "num" }, [
        h("button", { class: "btn" }, "+"),
        h("div", { class: "label" }, 7),
        h("button", { class: "btn" }, "-"),
      ]),
      h("div", { class: "num" }, "="),
      h("div", { class: "result" }, 15),
    ]);
  },
}).mount("#app");
