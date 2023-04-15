import { reactive, effect, ref, computed } from "./reactivity.js";

let product = reactive({ price: 5, quantity: 2 });
let total = 0;

effect(() => {
  total = product.price * product.quantity;
});

console.log(total);
product.quantity = 3;
console.log(total);
