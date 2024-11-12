// 检查commit message
const path = require("node:path");
const { readFileSync } = require("node:fs");

const msgFile = process.argv[2];

const msg = readFileSync(path.resolve(process.cwd(), msgFile), "utf-8").trim();
if (
  !msg.length ||
  /^# Please enter the commit message for your changes/.test(msg)
) {
  throw new Error("[hera-favorite]: Commit message 不得为空");
}

const commitRE =
  /^(v\d+\.\d+\.\d+(-(alpha|beta|rc.\d+))?$)|((revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|ci|chore|types|build|release)(\(.+\))?:? .{1,50})/;
if (!commitRE.test(msg)) {
  throw new Error(`[hera-favorite]: Commit message 不符合规范\n
    规范: [type]((branchName)?): (message)\n
          feat(main): add --version option\n
    type: feat：新功能
          fix：修改bug
          docs：文档修改
          style：代码格式修改，注意不是css修改（例如分号修改）
          refactor：代码重构（重构，在不影响代码内部行为、功能下的代码修改）
          perf：更改代码，以提高性能
          test：测试用例新增、修改
          workflow：工作流相关文件修改
          ci：持续集成想相关文件修改
          chore：其他修改（不在上述类型的修改）
          types：类型、特征
          build：影响项目构建或依赖项修改
    `);
}
