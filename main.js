import { reactive, effect } from "./reactivity.js";
const obj1 = reactive({
  a: 0,
  b: 0,
});

// 現状、1つのオブジェクトのプロパティに対して、1つの関数しか登録できない
effect(() => {
  console.log("a", obj1.a);
});

effect(() => {
  console.log("b", obj1.b);
});

obj1.b = 1;
