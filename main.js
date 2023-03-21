import { reactive, effect, computed } from "./reactivity.js";
const obj1 = reactive({
  a: 0,
  b: 2,
});

const computedValue = computed(() => {
  return obj1.a * 2;
});

obj1.a = 1;
console.log(computedValue.value);

obj1.a = 2;
console.log(computedValue.value);
