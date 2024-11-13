import * as path from "node:path";
import { defineConfig } from "rspress/config";

export default defineConfig({
  base: "/utils-site/", // 使用 github pages 部署，需要加上仓库前缀
  root: path.join(__dirname, "docs"),
  title: "utils-site",
  description: "收集一些常用的方法，留作个人学习使用",
  icon: "/rspress-icon.png",
  logo: {
    light: "/rspress-light-logo.png",
    dark: "/rspress-dark-logo.png",
  },
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/czy1998/utils-site",
      },
    ],
  },
});
