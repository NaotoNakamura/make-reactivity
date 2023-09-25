let activeEffect = null;

export function effect(fn) {
  activeEffect = fn;
  activeEffect();
}

const targetMap = new WeakMap();

function track(target) {
  targetMap.set(target, activeEffect);
}

export function trigger(target) {
  const effect = targetMap.get(target);
  effect();
}

const handler = {
  get: function (target, key, receiver) {
    console.log("get");
    track(target);
    return target[key];
  },
  set: function (target, key, value, receiver) {
    console.log("set");
    target[key] = value;
    trigger(target);
    return true;
  },
};

export function reactive(target) {
  return new Proxy(target, handler);
}
