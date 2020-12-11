
/* 路由处理 */
function convertRoutes(nodes) {
  if (!nodes) return null
  nodes = JSON.parse(JSON.stringify(nodes))
  let queue = Array.isArray(nodes) ? nodes.concat() : [nodes]
  while (queue.length) {
    const levelSize = queue.length
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()
      if (!node.children || !node.children.length) continue
      node.children.forEach(child => {
        // 转化相对路径
        if (child.path[0] !== '/' && !child.path.startsWith('http')) {
          child.path = node.path.replace(/(\w*)[/]*$/, `$1/${child.path}`)
        }
      })
      queue = queue.concat(node.children)
    }
  }
  return nodes
}

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
  convertRoutes,
}

