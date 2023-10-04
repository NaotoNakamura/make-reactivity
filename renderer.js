import { nodeOps } from "./nodeOps.js";

function createVNode(type = "", props = {}, children = "") {
  return {
    type,
    props,
    children,
  };
}

// n1 = old, n2 = new
function patch(n1, n2, container) {
  /**
   * TODO: 古いDOMを削除するように修正を行う
   * 現状はn1.typeが空（まだDOMに追加されていない）の状態のみを想定しているため、
   * タグの種類が異なれば要素を追加してしまう
   */
  let el;
  if (n1.type !== n2.type) {
    el = nodeOps.create(n2.type);
    nodeOps.append(container, el);
  }

  /*
   * TODO: 文字列以外も子要素に指定できるようにする
   * 現状のchildrenはDOM要素が来ない想定（文字列のみ）
   */
  if (n1.children !== n2.children) {
    nodeOps.html(el, n2.children);
  }
}

export { createVNode, patch };
