const handler = {
  get: function (target, prop, receiver) {
    console.log("get trap called");
    track(target, prop);
    return Reflect.get(target, prop, receiver);
  },
  set: function (target, prop, value, receiver) {
    Reflect.set(target, prop, value, receiver);
    console.log("set trap called");
    trigger(target, prop);
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

const track = (target, key) => {
  let depsMap = targetMap.get(target);
  if (depsMap === undefined) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  // key（オブジェクトのプロパティ）
  // activeEffect（effectで登録した関数）
  depsMap.set(key, activeEffect);
};

// リアクティブなオブジェクトの変更を検知
const trigger = (target, key) => {
  const depsMap = targetMap.get(target);
  if (depsMap === undefined) {
    return;
  }
  const effect = depsMap.get(key);
  effect();
};

export { reactive, effect };

// effectで関数を登録すると、一度その関数を実行する
// 実行した関数内にリアクティブなオブジェクトがあればゲッターが呼ばれる
// ゲッターの中でリアクティブなオブジェクトをキーに、
// プロパティとeffectで登録した関数の組み合わせをバリューにして
