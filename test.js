import path from 'path';
import execa from 'execa';
import pathExists from 'path-exists';
import rimraf from 'rimraf';
import test from 'ava';

test(async t => {
	await execa.stdout(path.join(__dirname, 'cli.js'), ['--out', __dirname, 'https://github.com/kevva/download-cli/archive/master.zip']);
	t.true(pathExists.sync(path.join(__dirname, 'download-cli-master.zip')));
	rimraf.sync(path.join(__dirname, 'download-cli-master.zip'));
});
