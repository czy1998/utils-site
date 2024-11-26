// 检查版本号是否统一
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");

// 读取更新记录
const changelogContent = readFileSync(resolve(__dirname, "../CHANGELOG.md"), {
  encoding: "utf8",
});
// 读取 package.json
const packageContent = readFileSync(resolve(__dirname, "../package.json"), {
  encoding: "utf8",
});

const versions = changelogContent
  .match(/(?<=### )\d+\.\d+\.\d+/g)
  .map((item) => item.split("."));

const sortedVersions = versions
  .sort((a, b) => {
    if (+a[0] > +b[0]) return -1;
    if (+a[0] < +b[0]) return 1;
    if (+a[1] > +b[1]) return -1;
    if (+a[1] < +b[1]) return 1;
    if (+a[2] > +b[2]) return -1;
    if (+a[2] < +b[2]) return 1;
    return 0;
  })
  .map((item) => item.join("."));

// 获取最新的版本号
const newestVersion = sortedVersions[0];

if (newestVersion !== JSON.parse(packageContent).version) {
  throw new Error(
    "[hera-favorite]: 更新日志最新版本号 与 package.json 版本号不一致",
  );
}
// 获取已修改但未暂存的所有文件
const [, , fileStr, packageChange] = process.argv;
const fileList = fileStr.split("\n");
if (
  fileList.some((file) => file === "package.json") &&
  packageChange.includes(`"version": "${JSON.parse(packageContent).version}"`)
) {
  throw new Error(
    "[hera-favorite]: 版本号修改后 package.json 还未添加至暂存区",
  );
}
