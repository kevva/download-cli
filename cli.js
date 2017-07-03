#!/usr/bin/env node
'use strict';
const meow = require('meow');
const download = require('download');

const cli = meow(`
	Usage
	  $ download <url>
	  $ download <url> > <file>
	  $ download --out <directory> <url>

	Example
	  $ download http://foo.com/file.zip
	  $ download http://foo.com/cat.png > dog.png
	  $ download --extract --strip 1 --out dest http://foo.com/file.zip

	Options
	  -e, --extract         Try decompressing the file
	  -o, --out             Where to place the downloaded files
	  -s, --strip <number>  Strip leading paths from file names on extraction
	  --filename <string>   Name of the saved file
	  --proxy <string>      Proxy endpoint
`, {
	boolean: [
		'extract'
	],
	string: [
		'filename',
		'out',
		'proxy'
	],
	alias: {
		e: 'extract',
		o: 'out',
		s: 'strip'
	}
});

if (cli.input.length === 0) {
	console.error('Specify a URL');
	process.exit(1);
}

const dl = download(cli.input[0], cli.flags.out, cli.flags);

if (!cli.flags.out) {
	dl.pipe(process.stdout);
}
