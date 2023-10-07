import { createApp, h } from "./app.js";

createApp({
  data: () => ({
    a: 8,
    b: 7,
  }),
  computed: {
    sum() {
      return this.data.a + this.data.b;
    },
  },
  render() {
    return h("div", { class: "container" }, [
      h("div", { class: "num" }, [
        h("button", { class: "btn" }, "+"),
        h("div", { class: "label" }, this.data.a),
        h("button", { class: "btn" }, "-"),
      ]),
      h("num", { class: "num" }, "+"),
      h("div", { class: "num" }, [
        h("button", { class: "btn" }, "+"),
        h("div", { class: "label" }, this.data.b),
        h("button", { class: "btn" }, "-"),
      ]),
      h("div", { class: "num" }, "="),
      h("div", { class: "result" }, this.computed.sum.value),
    ]);
  },
}).mount("#app");
