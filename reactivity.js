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

const effect = (fn) => {
  try {
    activeEffect = fn;
    activeEffect();
    return activeEffect;
  } finally {
    activeEffect = null;
  }
};

const targetMap = new WeakMap();

const track = (target, key) => {
  if (activeEffect === null) return;
  let depsMap = targetMap.get(target);
  if (depsMap === undefined) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let deps = depsMap.get(key);
  if (deps === undefined) {
    deps = new Set();
    depsMap.set(key, deps);
  }
  if (!deps.has(activeEffect)) {
    deps.add(activeEffect);
  }
};

const trigger = (target, key) => {
  const depsMap = targetMap.get(target);
  if (depsMap === undefined) return;
  const deps = depsMap.get(key);
  if (deps === undefined) return;
  deps.forEach((effect) => {
    effect();
  });
};

const computed = (getter) => {
  let computed;
  const runner = effect(getter);
  computed = {
    get value() {
      return runner();
    },
  };
  return computed;
};

export { reactive, effect, computed };
