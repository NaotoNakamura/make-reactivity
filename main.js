import { reactive, effect } from "./reactivity.js";
const obj1 = reactive({ a: 0 });
const obj2 = reactive({ a: 0 });

// 現状、obj1.aを呼び出した場合でも以下の処理が呼び出されてしまう
// 本来はリアクティブな値（obj2.a）が更新された時のみ呼び出したい
effect(() => {
  console.log("1", obj1.a);
});

effect(() => {
  console.log("2", obj2.a);
});

obj1.a = 1;
obj2.a = 1;
