# limitPromise

## 限制同时运行的 Promise 数量

```ts
type queueItem = () => Promise<Response>;

/**
 * 模拟队列，限制同时运行的 promise 数量
 * @param max 同时运行的最大数量
 * @returns
 */
const createQueue = (max: number) => {
  const queue: queueItem[] = [];
  let currentIndex = 0;
  const doing = () => {
    while (queue.length && currentIndex < max) {
      currentIndex++;
      const request = queue.shift() as queueItem;
      request()
        .then(() => {})
        .catch(() => {})
        .finally(() => {
          currentIndex--;
          doing();
        });
    }
  };

  return (requestFn: queueItem) => {
    queue.push(requestFn);
    doing();
  };
};

const pool = createQueue(4);

for (let i = 0; i < 10; i++) {
  pool(() => fetch("https://www.baidu.com"));
}
```

::: tip

chrome 浏览器，已经做了同时请求数量的限制，当有大量请求发起时，只会同时进行 6-8 个请求，其余会处于 `pending` 状态
:::
