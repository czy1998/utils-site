# getEnabledBits

## 转换数值，返回启用的位

```ts
/**
 * 使用位运算解析value返回开启的项目
 * @param {*} value
 * @returns
 */
export function getEnabledBits(value: string | number): number[] {
  if (!value || "number" !== typeof +value) return [];
  const res = Array.from(value.toString(2))
    .reverse()
    .map((val, index) => {
      return val === "1" ? 2 ** index : 0;
    })
    .filter(Boolean);
  return res;
}
```
