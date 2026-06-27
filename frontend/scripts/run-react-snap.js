const { spawnSync } = require("child_process");
const path = require("path");

const shouldSkipForPlatform =
  process.platform === "darwin" && process.arch === "arm64";

if (process.env.SKIP_REACT_SNAP === "true" || shouldSkipForPlatform) {
  const reason = process.env.SKIP_REACT_SNAP === "true"
    ? "SKIP_REACT_SNAP=true"
    : "react-snap's bundled Puppeteer is not compatible with darwin/arm64";
  console.log(`Skipping react-snap: ${reason}`);
  process.exit(0);
}

const reactSnapBin = path.join(__dirname, "..", "node_modules", ".bin", "react-snap");
const result = spawnSync(reactSnapBin, { stdio: "inherit", shell: true });

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
