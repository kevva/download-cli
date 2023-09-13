#!/usr/bin/env node

import process from 'node:process';
import meow from 'meow';
import download from 'download';

const cli = meow(`
	Usage
	  $ download <url>
	  $ download <url> > <file>
	  $ download --out <directory> <url>

	Example
	  $ download http://foo.com/file.zip
	  $ download http://foo.com/cat.png > dog.png
	  $ download --extract --strip 1 --out dest http://foo.com/file.zip
	  $ download --header 'authorization: Basic foo:bar' http://foo.com/file.zip

	Options
	  -e, --extract         Try decompressing the file
	  -o, --out             Where to place the downloaded files
	  -s, --strip <number>  Strip leading paths from file names on extraction
	  --filename <string>   Name of the saved file
	  --proxy <string>      Proxy endpoint
	  --header <string>     HTTP header. Can be set multiple times
`, {
	importMeta: import.meta,
	boolean: [
		'extract',
	],
	string: [
		'filename',
		'out',
		'proxy',
	],
	alias: {
		e: 'extract',
		o: 'out',
		s: 'strip',
	},
});

if (cli.input.length === 0) {
	console.error('Specify a URL');
	process.exit(1);
}

const parseHeader = header => {
	const headerSplit = header.split(/:([^]+)/);
	return [headerSplit[0], headerSplit[1]];
};

const toHeaderObject = headers => {
	const headerObject = {};

	for (const headerString of headers) {
		const header = parseHeader(headerString);
		headerObject[header[0]] = header[1];
	}

	return headerObject;
};

const getOptions = flags => {
	if (!flags.header) {
		return flags;
	}

	const headers = Array.isArray(flags.header) ? flags.header : [flags.header];

	const options = Object.assign(flags, {
		headers: toHeaderObject(headers),
	});

	delete options.header;

	return options;
};

const dl = download(cli.input[0], cli.flags.out, getOptions(cli.flags));

if (!cli.flags.out) {
	dl.pipe(process.stdout);
}
