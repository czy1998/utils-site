# getValueType

## 获取参数类型

```ts
const getValueType = (value: any): string => {
  const result = Object.prototype.toString.call(value);
  const [type] = result.match(/(?<=\[object\s)(\S+)(?=])/g);
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
