let activeEffect = null;

export function effect(fn, { computed = false } = {}) {
  try {
    activeEffect = fn;
    activeEffect.computed = computed;
    if (computed) {
      activeEffect.dirty = true;
    }
    activeEffect();
    return activeEffect;
  } finally {
    activeEffect = null;
  }
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
    if (effect.computed) {
      effect.dirty = true;
    } else {
      effect();
    }
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

export function computed(getter, ctx) {
  let computed, value;
  const runner = effect(getter.bind(ctx), { computed: true });
  computed = {
    get value() {
      if (runner.dirty) {
        console.log("runnerが実行");
        value = runner();
        runner.dirty = false;
      }
      return value;
    },
  };
  return computed;
}
