import { reactive, computed } from "./reactivity.js";

const obj1 = reactive({
  a: 0,
  b: 1,
});

const computedValue = computed(() => {
  return obj1.a + 10;
});

console.log(computedValue.value);
console.log(computedValue.value);
obj1.a = 1;
console.log(computedValue.value);
