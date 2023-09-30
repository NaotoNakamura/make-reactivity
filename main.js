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

/**
 * TODO: effect関数を実行した時のみ依存関数を登録するように修正する
 * 現状は以下のように処理される
 * 1. Proxyのsetが呼ばれ、trigger関数の中でobj1.aの依存関数が呼ばれる
 * 2. 依存関数の中ではobj1.aを呼び出しているので、Proxyのgetが呼ばれる
 * 3. track関数の中でactiveEffectを追加で登録しているが、この時点のactiveEffectは
 *    obj1.bの方の関数が残っているので、それを登録してしまう
 * 4. trackの処理が終了し、consoleに「obj1.aが変更されました1」と表示
 * 5. triggerの処理に戻ってくると、depsにobj1.bの方の関数が追加されているので、
 *    もう1つeffect();を実行して「obj1.bが初期化されました」と表示されてしまう
 */

obj1.a = "変更";
