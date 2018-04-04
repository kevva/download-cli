# download-cli [![Build Status](https://travis-ci.org/kevva/download-cli.svg?branch=master)](https://travis-ci.org/kevva/download-cli)

> Download and extract files

*See [download](https://github.com/kevva/download) for the programmatic API and issue tracker.*


## Install

```
$ npm install --global download-cli
```


## Usage

```
$ download --help

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
```


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
