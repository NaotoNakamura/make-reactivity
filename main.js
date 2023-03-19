import { reactive, effect } from "./reactivity.js";
const obj1 = reactive({
  a: 1,
  b: 2,
});

effect(() => {
  console.log(obj1.a * 2);
});

// getの時はそのまま値を返す
console.log(obj1.a);

// setの時（オブジェクトが変更された時）は
// オブジェクトのプロパティに対応したeffectを呼び出して実行する
obj1.a = 1;
