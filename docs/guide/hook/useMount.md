# useMount

## 只在组件初始化时执行的 Hook

```ts
import React, { useEffect } from "react";

const useMount = (fn: () => void) => {
  useEffect(() => {
    fn?.();
  }, []);
};
```

### 应用

```ts
const getData = async () => {
  fetch();
};

useMount(() => {
  getData();
});
```
