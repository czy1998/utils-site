# download

### 下载图片

```ts
function aDownload(url, fileName) {
  const a = document.createElement("a");
  a.target = "_blank";
  a.rel = "noopener";
  a.download = fileName;
  a.setAttribute("download", fileName);
  // 兼容：某些浏览器不支持HTML5的download属性
  if (typeof a.download === "undefined") {
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  }
  a.href = url;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
```

::: tip

提示
:::
