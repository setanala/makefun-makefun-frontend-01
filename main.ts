import { cp, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildDossier } from './vendor/makefun-frontend.ts';
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
await mkdir(out, { recursive: true });
await cp(new URL('./app', import.meta.url), join(out, 'app'), { recursive: true });
await cp(new URL('./screenshots', import.meta.url), join(out, 'screenshots'), { recursive: true });
const dossier = await buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 3, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 });
await writeFile(join(out, 'dossier.json'), dossier);
