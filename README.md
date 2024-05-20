[![Build Status](https://api.travis-ci.com/systelab/systelab-virtual-keyboard.svg?branch=master)](https://travis-ci.com/systelab/systelab-virtual-keyboard)
[![npm version](https://badge.fury.io/js/systelab-virtual-keyboard.svg)](https://badge.fury.io/js/systelab-virtual-keyboard)
[![Known Vulnerabilities](https://snyk.io/test/github/systelab/systelab-virtual-keyboard/badge.svg?targetFile=package.json)](https://snyk.io/test/github/systelab/systelab-virtual-keyboard?targetFile=package.json)


# systelab-virtual-keyboard

Library with common UI components to speed up your Angular developments. You can take a look to the components in our showcase at https://systelab.github.io/virtual-keyboard.

## Working with the repo

In order to clone the repository and test the library use the following commands:

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

### Unit

```bash
ng test
```

# Breaking changes

## Version 0.0.1

-   Pre-release version
