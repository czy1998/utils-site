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
      return;
    }
    console.log(`版本发布成功，版本号为: v${version}`);
  },
);
