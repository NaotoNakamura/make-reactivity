import { effect, reactive } from "./reactivity.js";

const obj1 = reactive({
  a: "初期化",
  b: "初期化",
});

effect(() => {
  console.log(`obj1.aが${obj1.a}されました1`);
});

effect(() => {
  console.log(`obj1.bが${obj1.b}されました`);
});

obj1.a = "変更";
