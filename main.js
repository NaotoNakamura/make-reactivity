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
  methods: {
    increment(key) {
      this.data[key]++;
    },
    decrement(key) {
      this.data[key]--;
    },
  },
  render() {
    return h("div", { class: "container" }, [
      h("div", { class: "num" }, [
        h(
          "button",
          {
            class: "btn",
            onClick: () => {
              this.methods.increment.call(this, "a");
            },
          },
          "+"
        ),
        h("div", { class: "label" }, this.data.a),
        h(
          "button",
          {
            class: "btn",
            onClick: () => {
              this.methods.decrement.call(this, "a");
            },
          },
          "-"
        ),
      ]),
      h("num", { class: "num" }, "+"),
      h("div", { class: "num" }, [
        h(
          "button",
          {
            class: "btn",
            onClick: () => {
              this.methods.increment.call(this, "b");
            },
          },
          "+"
        ),
        h("div", { class: "label" }, this.data.b),
        h(
          "button",
          {
            class: "btn",
            onClick: () => {
              this.methods.decrement.call(this, "b");
            },
          },
          "-"
        ),
      ]),
      h("div", { class: "num" }, "="),
      h("div", { class: "result" }, this.computed.sum.value),
    ]);
  },
}).mount("#app");
