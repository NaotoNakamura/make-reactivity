import { reactive, effect } from "./reactivity.js";
const obj1 = reactive({ a: 0 });
const obj2 = reactive({ a: 0 });

console.log(obj1.a + 100);

// 現状、obj1.bを呼び出した場合でも以下の処理が呼び出されてしまう
// 本来はリアクティブな値（obj2.a）が更新された時のみ呼び出したい
effect(() => {
  const value = obj1.a + 100;
  console.log(value);
});

obj1.a = 1;
obj2.a = 1;
