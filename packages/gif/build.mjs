import esbuild from 'esbuild';
import fs from 'fs';

const tmp = 'bundled-worker.js';

esbuild.buildSync({
	entryPoints: ['src/worker/worker.ts'],
	platform: 'browser',
	bundle: true,
	outfile: tmp,
	minify: true,
});

const content = fs.readFileSync(tmp, 'utf8');

fs.writeFileSync(
	'src/worker/source.ts',
	`
// Auto-generated by build.mjs
export const src =
// eslint-disable-next-line no-template-curly-in-string
  ${JSON.stringify(content)};
`.trim()
);

fs.unlinkSync(tmp);
