# download

## 下载

```ts
type DataSource = string | Blob;
type DownloadFn = (dataSource: DataSource, filename?: string) => void;

/** 图片url转换为base64 */
const urlToBase64 = (url: string) => {
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const reader = new FileReader();
      reader.onloadend = () => console.log(reader.result); // 输出 Base64
      reader.readAsDataURL(blob);
    })
    .catch((err) => console.error("Error:", err));
};

/** base64转换为Blob */
const base64ToBlob = (base64: string, mimeType?: string) => {
  const [head, dataStr] = base64.split(",");
  const type = mimeType || head.match(/(?<=:)([\w/]*)(?=;)/g)?.[0];
  const byteString = atob(dataStr); // 解码 Base64 字符串，返回 2进制 字符串
  // 2进制字符串每一位大小为都为 1字节，范围在  0–255（十六进制表示为  \x00 到 \xFF）
  const byteArray = new Uint8Array(byteString.length); // 创建字节数组

  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i); // 字符转换为整数
  }

  return new Blob([byteArray], { type: type || "" }); // 创建 Blob
};

/** 使用a标签下载 */
const useATag = (url: string, filename?: string) => {
  const aTag = document.createElement("a");
  aTag.style.display = "none";
  aTag.href = url;
  if (filename) {
    aTag.download = filename;
  }
  document.body.appendChild(aTag);
  aTag.click();
  document.body.removeChild(aTag);
};

/** 下载方法 */
const download: DownloadFn = async (dataSource, filename = "") => {
  if (typeof dataSource === "string") {
    let blob = null;
    let name = "";
    // 是否是 base64
    if (dataSource.includes(";base64")) {
      blob = base64ToBlob(dataSource);
    } else {
      name = (dataSource.match(/(?<=\/)([^\/]+)(?=\.[^/]+$)/g) || [""])[0];
      const res = await fetch(dataSource);
      blob = await res.blob();
    }
    const url = URL.createObjectURL(blob);
    useATag(url, filename || name);
    URL.revokeObjectURL(url);
  } else if (dataSource instanceof Blob) {
    const blob = new Blob([dataSource]);
    const url = URL.createObjectURL(blob);
    useATag(url, filename);
    URL.revokeObjectURL(url);
  } else {
    throw new Error("dataSource must be string or Blob");
  }
};
```

::: tip
在浏览器中，访问图片、pdf 时，会进入预览状态，而不是直接下载

:::
