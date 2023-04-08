import { createApp, h } from "./app.js";
createApp({
  data: () => ({
    a: 8,
    b: 7,
  }),
  render() {
    return h("div", { class: "container" }, [
      h("div", { class: "num" }, [
        h("button", { class: "btn" }, "+"),
        h("div", { class: "label" }, this.data.a),
        h("button", { class: "btn" }, "-"),
      ]),
      h("div", { class: "num" }, "+"),
      h("div", { class: "num" }, [
        h("button", { class: "btn" }, "+"),
        h("div", { class: "label" }, this.data.b),
        h("button", { class: "btn" }, "-"),
      ]),
      h("div", { class: "num" }, "="),
      h("div", { class: "result" }, 15),
    ]);
  },
}).mount("#app");
