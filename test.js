import path from 'node:path';
import * as url from 'node:url';
import {execa} from 'execa';
import {pathExistsSync} from 'path-exists';
import {rimraf} from 'rimraf';
import test from 'ava';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

test('Download file from GitHub', async t => {
	await execa(path.join(__dirname, 'cli.js'), ['--out', __dirname, 'https://github.com/kevva/download-cli/archive/master.zip']);
	t.true(pathExistsSync(path.join(__dirname, 'download-cli-master.zip')));
	rimraf.sync(path.join(__dirname, 'download-cli-master.zip'));
});
