const fs = require("fs");
const m = fs
  .readFileSync("coverage/lcov-report/index.html", "utf8")
  .match(/<span class="strong">([\d.]+)% <\/span>/);
if (m) {
  let r = fs.readFileSync("README.md", "utf8");
  const badge = `![Coverage](https://img.shields.io/badge/coverage-${m[1]}%25-yellow)`;
  r = r.replace(
    /!\[Coverage\]\(https:\/\/img\.shields\.io\/badge\/coverage-[^)]*\)/,
    badge
  );
  fs.writeFileSync("README.md", r);
}
