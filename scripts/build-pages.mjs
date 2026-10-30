import { cp, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { join, resolve } from "node:path";

// Build an isolated static copy; retain the server API in the source repository.
const root = process.cwd();
const stage = await mkdtemp(join(root, ".pages-build-"));
try {
  for (const name of [
    "app",
    "components",
    "lib",
    "public",
    "package.json",
    "package-lock.json",
    "tsconfig.json",
    "next-env.d.ts",
    "next.config.ts",
  ]) {
    await cp(join(root, name), join(stage, name), {
      recursive: true,
      filter: (source) => source !== join(root, "app", "api"),
    });
  }
  await symlink(join(root, "node_modules"), join(stage, "node_modules"), "dir");
  const result = spawnSync(
    process.execPath,
    [join(root, "node_modules/next/dist/bin/next"), "build", "--webpack"],
    {
      cwd: stage,
      stdio: "inherit",
      env: {
        ...process.env,
        GITHUB_PAGES: "true",
        NEXT_PUBLIC_STATIC_EXPORT: "true",
        NEXT_PUBLIC_BASE_PATH: "/EVO-GROUP",
        NEXT_PUBLIC_SITE_URL: "https://nefisauan.github.io/EVO-GROUP",
      },
    },
  );
  if (result.status !== 0) throw new Error("GitHub Pages build failed.");
  const output = resolve(root, "out");
  await rm(output, { recursive: true, force: true });
  await cp(join(stage, "out"), output, { recursive: true });
  await writeFile(join(output, ".nojekyll"), "");
  console.log("GitHub Pages artifact is ready in out/.");
} finally {
  await rm(stage, { recursive: true, force: true });
}
