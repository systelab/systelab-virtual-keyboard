[![Codacy Badge](https://app.codacy.com/project/badge/Grade/4b9aac15463b46bba542091304304388)](https://www.codacy.com/gh/systelab/systelab-components/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=systelab/systelab-components&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.com/systelab/systelab-components.svg?branch=master)](https://travis-ci.com/systelab/systelab-components)
[![codecov](https://codecov.io/gh/systelab/systelab-components/branch/master/graph/badge.svg)](https://codecov.io/gh/systelab/systelab-components)
[![npm version](https://badge.fury.io/js/systelab-components.svg)](https://badge.fury.io/js/systelab-components)
[![Known Vulnerabilities](https://snyk.io/test/github/systelab/systelab-components/badge.svg?targetFile=package.json)](https://snyk.io/test/github/systelab/systelab-components?targetFile=package.json)

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
