const obj1 = { a: 0 };

const value = obj1.a + 100;

console.log(value);

// obj1はリアクティブではないので、obj1.aに100を代入してもvalueは100のまま
obj1.a = 100;
console.log(value);
