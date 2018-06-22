# Consent Management Provider (CMP)

[![Build status](https://travis-ci.org/scm-spain/CMP.svg?branch=master)](https://travis-ci.org/scm-spain/CMP) [![codecov](https://codecov.io/gh/scm-spain/CMP/branch/master/graph/badge.svg)](https://codecov.io/gh/scm-spain/CMP)

## License
CMP is [MIT licensed](./LICENSE).

## Install dependencies

```bash
npm install
```

## Tasks

###  Build

To generate the final distribution file, run the following command:

```bash
npm run build
```

This command will generate a _pro_ (minified) version (cmp.pro.js) inside _dist_ folder.

###  Dev

To generate a development distribution file, run the following command:

```bash
npm run dev
```

This command will generate a _dev_ (bundle) version (cmp.dev.js) inside _dist_ folder.

###  Tests

To check that everything is still ok:

```bash
npm test
```

###  Lint

This project follows standard code style rules proposed by Schisbted Spain, , to check them just run this command: 

```bash
npm run lint
```


