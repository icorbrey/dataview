# Dataview

The Dataview backing code for my [Obsidian][obsidian] vault.

## Getting started

Clone the repository and install dependencies:

```
git clone https://github.com/icorbrey/dataview
cd ./dataview
npm install
```

## Running tests

Tests are built with [Jest][jest].

```
npm test
```

## Building

This project is configured to emit a single JS file with no dependencies so
that it can be used as a view for [Dataview][dataview]. To build, run the
following:

```
npm run build
```

You can then copy `./dist/view.js` to your view directory in your Obsidian
vault.

## License

This project is distributed under the [MIT license][license].

[dataview]: https://blacksmithgu.github.io/obsidian-dataview/
[jest]: https://jestjs.io/docs/getting-started
[obsidian]: https://obsidian.md/
[license]: ./LICENSE
