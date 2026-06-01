const { spawnSync } = require("child_process");
const path = require("path");

const gitPaths =
  process.platform === "win32"
    ? ["C:\\Program Files\\Git\\cmd", "C:\\Program Files\\Git\\bin"]
    : ["/usr/local/bin", "/usr/bin", "/opt/homebrew/bin"];

const env = {
  ...process.env,
  PATH: [...gitPaths, process.env.PATH].filter(Boolean).join(path.delimiter),
};

const command = process.platform === "win32" ? "npx.cmd" : "npx";
const result = spawnSync(command, ["gh-pages", "-d", "build"], {
  stdio: "inherit",
  env,
  shell: true,
});

process.exit(result.status === 0 ? 0 : 1);
