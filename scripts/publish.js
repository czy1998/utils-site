// 发布 tag 并推送
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const { exec } = require("node:child_process");

// 读取 package.json
const packageContent = readFileSync(resolve(__dirname, "../package.json"), {
  encoding: "utf8",
});

const version = JSON.parse(packageContent).version;

exec(
  `pnpm build && git tag v${version} && git push origin v${version}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`${error}`);
      if (`${error}`.includes("already exists")) {
        console.log(
          `提示：当前tag（v${version}）已存在，请从以下几个方面进行检查`,
        );
        console.log("1. package.json、CHANGELOG.md 中最新的版本号是否一致");
        console.log("2. 执行 git tag -l 检查本地已有的 tags");
        console.log("3. 执行 git ls-remote -t 检查远程仓库已有的 tags");
      }
      return;
    }
    console.log(`版本发布成功，版本号为: v${version}`);
  },
);
function addVersion() {
  const [p1, p2, p3] = version.split(".");
  return `${p1}.${p2}.${+p3 + 1}`;
}
