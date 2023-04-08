import { reactive, effect } from "./reactivity.js";
const obj = reactive({ a: 0 });
let sum;
// 以下の例だとリアクティブオブジェクトであるobj.aが変更されたら、effect内の関数が再実行される
effect(() => {
  sum = obj.a + 10;
});
console.log(sum); // 10が出力される
obj.a = 10; // 値を変更
console.log(sum); // 20が出力される
