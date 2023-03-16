const handler = {
  get: function (target, prop, receiver) {
    console.log("get trap called");
    return Reflect.get(target, prop, receiver);
  },
  set: function (target, prop, value, receiver) {
    Reflect.set(target, prop, value, receiver);
    console.log("set trap called");
    trigger();
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
};

// リアクティブなオブジェクトの変更を検知
const trigger = () => {
  activeEffect();
};

export { reactive, effect };
