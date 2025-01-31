import path from "node:path";
import { fileURLToPath } from "node:url";

import eslintNuxt from "@byloth/eslint-config-nuxt";
import { includeIgnoreFile } from "@eslint/compat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [includeIgnoreFile(gitignorePath), ...eslintNuxt];
