# getUrlParam

## 获取 url 上的参数

```ts
type StringObject = {
  [key: string]: string;
};

/** 获取 url/目标url 上的参数 */
function getUrlParam(key: undefined, targetUrl?: string): StringObject;
function getUrlParam(key: string, targetUrl?: string): string;
function getUrlParam(key?: string, targetUrl?: string): string | StringObject {
  if (!key && key !== undefined) {
    throw new Error(
      "获取 Url 参数失败：请传入正确的 key（key 可为空或字符串）"
    );
  }
  const params = (targetUrl || location.href).match(
    /(?<=\?)([^\/]*)(?=\/)?/g
  )?.[0];
  if (!params?.length) {
    return key === undefined ? {} : "";
  }
  const result = params
    .split("&")
    .filter((v) => v)
    .reduce((prev: StringObject, next) => {
      const [key, value] = next.split("=");
      prev[key] = decodeURIComponent(decodeURI(value || ""));
      return prev;
    }, {});
  if (key === undefined) {
    return result;
  }
  return result[key] ?? "";
}
```

### 应用

```ts
location.href = "about:blank?name=123&age=17";

getUrlParam(); // {name: '123', age: '17'}
getUrlParam("name"); // '123'
getUrlParam("age"); // '17'
```
