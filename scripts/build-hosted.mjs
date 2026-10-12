import { spawnSync } from 'node:child_process';
const result = spawnSync(process.execPath, ['node_modules/next/dist/bin/next','build'], {stdio:'inherit', env:{...process.env, PYCCA_STATIC_EXPORT:'1'}});
process.exit(result.status ?? 1);
