import { reactive, effect } from "./reactivity.js";
const obj1 = reactive({
  a: 0,
  b: 0,
});

// 現状、obj1.bを呼び出した場合でもobj1.aにしか依存してないeffectの処理が呼び出されてしまう
// （現状はWeakMapに登録した関数が上書きされるので、一番最後にeffectに登録したものが実行）
// 本来はリアクティブな値（obj1.a）が更新された時のみ呼び出したい
effect(() => {
  console.log("a", obj1.a);
});

effect(() => {
  console.log("b", obj1.b);
});

obj1.b = 1;
