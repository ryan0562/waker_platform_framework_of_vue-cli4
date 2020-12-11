


/* ---------------------------------防抖 节流 ----------------------------------------- */
// methods使用
// import { debounce, throttle } from "@/utils/debounce";
/* methods: {
  testThrottle: throttle(function (e) {
    this.getText("v");
  }, 1000),
} */
// 防抖
function debounce(fn, wait = 1000) {
  let timeout;
  return function (event) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.call(this, event)
    }, wait)
  }
}

//节流
function throttle(fn, delay, atleast) {
  let timer = null;
  let previous = null;
  return function (event) {
    let now = +new Date()
    if (!previous) previous = now;
    if (atleast && now - previous > atleast) {
      fn.call(this, event)
      previous = now;
      clearTimeout(timer)
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.call(this, event)
        previous = null
      }, delay)
    }
  }
}
export default {
  debounce,
  throttle,
}

