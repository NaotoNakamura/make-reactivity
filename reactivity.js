let activeEffect = null;
const targetMap = new WeakMap();

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

function effect(eff) {
  activeEffect = eff;
  activeEffect();
  activeEffect = null;
}

function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect);
  }
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => {
      effect();
    });
  }
}

function ref(raw) {
  const r = {
    get value() {
      track(this, "value");
      return raw;
    },
    set value(newVal) {
      raw = newVal;
      trigger(this, "value");
    },
  };
  return r;
}

function computed(getter) {
  let result = ref();
  effect(() => (result.value = getter()));
  return result;
}

export { reactive, effect, ref, computed };
