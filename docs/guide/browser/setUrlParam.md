# setUrlParam

## 设置 url 上的参数

```ts
type param = {
  [key: string]: any;
};

/** 设置url上的参数 */
const setUrlParam = (data: param): void => {
  if (
    Object.prototype.toString.call(data) !== "[object Object]" ||
    Object.keys().length === 0
  ) {
    throw new Error("设置 Url 参数失败：参数需要是非空对象");
  }
  const keys = Reflect.ownKeys(data);
  // 捕获 ? 后面到第一个 / 之间的内容，如 ?name=tom/ 中间的 name=tom
  const paramsReg = new RegExp(/(?<=\?)([^\/]*)(?=\/)?/, "g");
  // 如果url上没有 ? ，则捕获结果为 undefined，给其默认赋值 '?'，用于最后拼接
  let params = location.href.match(paramsReg)?.[0] ?? "?";
  for (const key of keys) {
    const value = encodeURIComponent(data[key]);
    // 若 key 存在捕获结果中，则更新值；不存在则进行拼接
    // 此处动态正则，询问ai，提到存在潜在的注入问题，若key中包含「正则表达式的特殊符号」，会影响执行结果，甚至影响性能
    if (params.indexOf(`${key}=`) !== -1) {
      const reg = new RegExp(`(?<=${key}=)[^&]+(?=&)?`, "g");
      params = params.replace(reg, value);
    } else {
      // ?: 初始url上 ? 都没没有，上文附加的
      // '': 初始url上只有一个 ? ，没有后续参数
      params +=
        params.endsWith("&") || params.endsWith("?") || params === ""
          ? `${key}=${value}`
          : `&${key}=${value}`;
    }
  }
  const url =
    params.indexOf("?") !== -1
      ? location.href + params
      : location.href.replace(paramsReg, params);
  // 更新浏览器历史记录，不刷新页面
  history.replaceState({}, "", url);
};
```

::: tip
避免 value 设置为以下类型：

`Symbol` 会抛错

`Object` url 上 value 会变成 `name=[object%20Object]`
:::
