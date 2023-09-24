import { effect, trigger } from "./reactivity.js";

const obj = { a: 0 };

effect(() => {
  console.log(`${obj.a}が変更されました`);
});

obj.a = 1;
// TODO: オブジェクトが変更された時に自動でtriggerを呼ぶように修正
trigger();
