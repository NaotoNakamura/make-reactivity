let activeEffect = null;

export function effect(fn) {
  activeEffect = fn;
}

export function trigger() {
  activeEffect();
}
