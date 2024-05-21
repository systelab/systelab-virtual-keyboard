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

Use watch in the library build to detect file changes automatically (except from css). Start application in a different terminal:

Terminal 1

```bash
ng build systelab-virtual-keyboard --watch
```

Terminal 2

```bash
ng serve
```

## Test

This library comes with a suite of automated tests based on WebDriverIO framework. It can be executed with:

```bash
npm run test-dev
```
