const handler = {
  get: function (target, prop, receiver) {
    console.log("get trap called");
    track(target);
    return Reflect.get(target, prop, receiver);
  },
  set: function (target, prop, value, receiver) {
    Reflect.set(target, prop, value, receiver);
    console.log("set trap called");
    trigger(target);
    return true;
  },
};

const reactive = (target) => {
  return new Proxy(target, handler);
};

let activeEffect = null;

// リアクティブなオブジェクトの変更時に呼ばれるメソッドを保存する
const effect = (fn) => {
  activeEffect = fn;
  activeEffect();
};

const targetMap = new WeakMap();

const track = (target) => {
  targetMap.set(target, activeEffect);
};

// リアクティブなオブジェクトの変更を検知
const trigger = (target) => {
  const effect = targetMap.get(target);
  effect();
};

export { reactive, effect };

// effectで関数を登録すると、一度その関数を実行する
// 実行した関数内にリアクティブなオブジェクトがあればゲッターが呼ばれる
// ゲッターの中でリアクティブなオブジェクトと登録した関数の紐付けを行う
