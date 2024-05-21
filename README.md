[![Build Status](https://api.travis-ci.com/systelab/systelab-virtual-keyboard.svg?branch=master)](https://app.travis-ci.com/systelab/systelab-virtual-keyboard)
[![npm version](https://badge.fury.io/js/systelab-virtual-keyboard.svg)](https://badge.fury.io/js/systelab-virtual-keyboard)
[![Known Vulnerabilities](https://snyk.io/test/github/systelab/systelab-virtual-keyboard/badge.svg?targetFile=package.json)](https://snyk.io/test/github/systelab/systelab-virtual-keyboard?targetFile=package.json)


# systelab-virtual-keyboard

Library that integrates a virtual keyboard to allow entering input data through a touch screen. You can take a look to this component in our showcase at https://systelab.github.io/virtual-keyboard.

## Working with the repo

In order to clone the repository and work with the library use the following commands:

```bash
git clone https://github.com/systelab/systelab-virtual-keyboard.git
cd systelab-virtual-keyboard
npm ci
npm run build-lib
npm start
```

This will bootstrap a showcase application to test the library.

Use watch to generate a library build and detect file changes automatically (*except for css*) in Terminal 1:

```bash
npm run watch
```

Start the showcase application in Terminal 2:

```bash
npm start
```

## Test

This library comes with a suite of automated tests based on WebDriverIO framework. It can be executed with:

```bash
npm run test-dev
```
