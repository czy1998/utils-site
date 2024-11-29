# omit

## 过滤对象中的属性

```ts
/**
 * 根据列表，过滤对象中的属性，返回一个新对象
 * @param data 数据源
 * @param list 需要过滤属性的列表
 */
export const omit = (data: Record<string, any>, list: string[]) => {
  const obj = { ...data };
  for (const key of list) {
    if (key in obj) {
      delete obj[key];
    }
  }
  return obj;
};
```

### 应用

```ts
const obj = {
  name: "tom",
  age: 123,
};

omit(obj, ["name", "age"]); // obj => {}
```
