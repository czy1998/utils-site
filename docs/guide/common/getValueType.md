# getValueType

## 获取参数类型

```ts
const getValueType = (value: any): string => {
  const type = typeof value;
  if (type !== "object") {
    return type;
  }
  const result = Object.prototype.toString.call(value);
  // Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, "$1");
  const type = result.slice(8, -1);
  return type;
};
```

### 应用

```ts
getValueType(1); // 'Number'
getValueType("hello"); // 'String'
getValueType(false); // 'Number'
getValueType(null); // 'Null'
getValueType(undefined); // 'Undefined'
getValueType(10n); // 'BigInt'
getValueType(Symbol.for(123)); // 'Symbol'
getValueType([]); // 'Array'
getValueType({}); // 'Object'
getValueType(() => {}); // 'Function'
```
