let activeEffect = null;

export function effect(fn) {
  activeEffect = fn;
  activeEffect();
  activeEffect = null;
}

const targetMap = new WeakMap();

function track(target, key) {
  if (activeEffect === null) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const deps = depsMap.get(key);
  if (!deps) return;
  deps.forEach((effect) => {
    effect();
  });
}

const handler = {
  get: function (target, key, receiver) {
    console.log("get");
    track(target, key);
    return target[key];
  },
  set: function (target, key, value, receiver) {
    console.log("set");
    target[key] = value;
    trigger(target, key);
    return true;
  },
};

export function reactive(target) {
  return new Proxy(target, handler);
}
