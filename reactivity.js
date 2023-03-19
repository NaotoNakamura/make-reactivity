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

// リアクティブなオブジェクトの変更時に呼ばれるメソッドを保存する
const effect = (fn) => {
  activeEffect = fn;
  activeEffect();
  activeEffect = null;
};

// リアクティブオブジェクト: Mapオブジェクト
// （{{a: 0, b: 0} => Map(0) {…}}）
// オブジェクト: Map(オブジェクトのプロパティ名: [実行したい関数])
const targetMap = new WeakMap();

const track = (target, key) => {
  if (activeEffect === null) return;
  let depsMap = targetMap.get(target);
  if (depsMap === undefined) {
    // リアクティブオブジェクトのキー名: Setオブジェクト
    // a => Set(0) {…}
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let deps = depsMap.get(key);
  if (deps === undefined) {
    // 同一オブジェクトの同一プロパティに対して複数の関数を登録できるようにSetを使用
    deps = new Set();
    depsMap.set(key, deps);
  }
  if (!deps.has(activeEffect)) {
    deps.add(activeEffect);
  }
};

// リアクティブなオブジェクトの変更を検知
const trigger = (target, key) => {
  const depsMap = targetMap.get(target);
  if (depsMap === undefined) return;
  const deps = depsMap.get(key);
  if (deps === undefined) return;
  deps.forEach((effect) => {
    effect();
  });
};

export { reactive, effect };

// effectで関数を登録すると、一度その関数を実行する
// 実行した関数内にリアクティブなオブジェクトがあればゲッターが呼ばれる
// ゲッターの中ではtrackが呼び出され、リアクティブなオブジェクトをキーにMapを取得
// 取得したMapがundefinedであれば、リアクティブなオブジェクトをキーに空のMapを登録
// 取得したMapに対して、プロパティ名をキーに配列を取得
// 取得した配列がundefinedであれば、プロパティ名をキーに空のSetを登録
// 取得した配列に現在実行しているeffectがなければ追加する
