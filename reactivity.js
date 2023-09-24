let activeEffect = null;

export function effect(fn) {
  activeEffect = fn;
}

export function trigger() {
  activeEffect();
}

const handler = {
  get: function (target, key, receiver) {
    console.log("get");
    return target[key];
  },
  set: function (target, key, value, receiver) {
    console.log("set");
    target[key] = value;
    trigger();
    return true;
  },
};

export function reactive(target) {
  return new Proxy(target, handler);
}
