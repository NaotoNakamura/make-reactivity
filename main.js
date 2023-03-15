const obj1 = { a: 0 };

const obj2 = obj1.a + 100;

console.log(obj2);

// obj1はリアクティブではないので、obj1.aに100を代入してもobj2は100のまま
obj1.a = 100;
console.log(obj2);
