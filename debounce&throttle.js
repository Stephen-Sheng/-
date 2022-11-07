/*
 * @Author: Yutong Sheng
 * @Date: 2022-11-03 09:48:01
 * @Last Modified by: Yutong Sheng
 * @Last Modified time: 2022-11-03 09:56:03
 */

function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}
function throttle(fn, delay) {
  let timer = null;
  return function () {
    if (timer) return;

    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}
