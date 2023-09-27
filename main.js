import { effect, reactive } from "./reactivity.js";

const obj1 = reactive({
  a: 0,
  b: 100,
});
const obj2 = reactive({ b: 0 });

// TODO: 現状は1つのオブジェクトのキーに対して1つの依存関数しか登録できないため、
// 複数の依存関数を登録できるように修正する
effect(() => {
  console.log(`${obj1.a}: obj1.aが変更されました`);
});

obj1.a = 1;
obj1.b = 200;
obj2.b = 1;
