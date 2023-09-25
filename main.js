import { effect, reactive } from "./reactivity.js";

const obj1 = reactive({
  a: 0,
  b: 100,
});
const obj2 = reactive({ b: 0 });

effect(() => {
  /** TODO: オブジェクトのプロパティに変更があった時のみ実行するように修正する。
   * 現状はeffect内で参照していないオブジェクトのプロパティ（obj1.b）に変更があった時でも
   * effectを実行している（計3回この処理が呼び出される）。
   */
  console.log(`${obj1.a}が変更されました`);
});

obj1.a = 1;
obj1.b = 1;
obj2.b = 1;
