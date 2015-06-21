'use strict';
var path = require('path');
var spawn = require('child_process').spawn;
var concatStream = require('concat-stream');
var test = require('ava');

test('show help screen', function (t) {
	t.plan(1);

	var concat = concatStream(end);
	var cp = spawn(path.join(__dirname, 'cli.js'), ['--help']);

	function end(str) {
		t.assert(/Download and extract files/.test(str), str);
	}

	cp.stdout.setEncoding('utf8');
	cp.stdout.pipe(concat);
});

test('show version', function (t) {
	t.plan(1);

	var concat = concatStream(end);
	var cp = spawn(path.join(__dirname, 'cli.js'), ['--version']);
	var version = require('./package.json').version;

	function end(str) {
		t.assert(str.trim() === version, str);
	}

	cp.stdout.setEncoding('utf8');
	cp.stdout.pipe(concat);
});
