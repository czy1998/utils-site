# setUrlParam

## 设置 url 上的参数

```ts
/** 设置 url/目标url 上的参数 */
function setUrlParam(
  data: Record<string, any>,
  targetUrl: undefined
): undefined;
function setUrlParam(data: Record<string, any>, targetUrl: string): string;
function setUrlParam(
  data: Record<string, any>,
  targetUrl?: string
): undefined | string {
  if (
    Object.prototype.toString.call(data) !== "[object Object]" ||
    Object.keys(data).length === 0
  ) {
    throw new Error("设置 Url 参数失败：参数需要是非空对象");
  }
  const wipUrl = targetUrl || location.href;
  const keys = Object.keys(data);
  // 捕获 ? 后面到第一个 / 之间的内容，如 ?name=tom/ 中间的 name=tom
  const paramsReg = new RegExp(/(?<=\?)([^\/]*)(?=\/)?/, "g");
  // 如果url上没有 ? ，则捕获结果为 undefined，给其默认赋值 '?'，用于最后拼接
  let params = wipUrl.match(paramsReg)?.[0] ?? "?";
  for (const key of keys) {
    const value = encodeURIComponent(data[key]);
    // 若 key 存在捕获结果中，则更新值；不存在则进行拼接
    if (params.indexOf(`${key}=`) !== -1) {
      // 将 key 所有字符添加一个转义标志，避免影响用于匹配的正则
      const saveKey = [].map
        .call(key, (v) => {
          if ("|^$*+?.(){}[]".includes(v)) return `\\${v}`;
          return v;
        })
        .join("");
      const reg = new RegExp(`(?<=${saveKey}=)[^&]+(?=&)?`, "g");
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
      ? wipUrl + params
      : wipUrl.replace(paramsReg, params);
  if (targetUrl) {
    return url;
  }
  // 更新浏览器历史记录，不刷新页面
  history.replaceState({}, "", url);
}
```

### 应用

```ts
// 当前页面  "https://www.baidu.com";
setUrlParam({ a: 123 }); // url变为: https://www.baidu.com?a=123

// 当前页面  "https://www.baidu.com?";
setUrlParam({ a: 123 }); // url变为: https://www.baidu.com?a=123

// 当前页面  "https://www.baidu.com/#/qqq";
setUrlParam({ a: 123 }); // url变为: https://www.baidu.com/#/qqq?a=123

setUrlParam({ a: 123 }, "https://www.baidu.com"); // 返回 ''https://www.baidu.com?a=123''
```

::: tip
避免 value 设置为以下类型：

`Symbol` 会抛错

`Object` url 上 value 会变成 `name=[object%20Object]`
:::
