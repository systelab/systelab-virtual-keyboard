import TestCaseReporter from 'systelab-components-wdio-test/lib/reporters/test-case.reporter.js';

export const config = {
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: 'projects/showcase/test/tsconfig.wdio.json'
        }
    },
    specs: [
        'projects/showcase/test/specs/**/*.ts'
    ],
    exclude: [],
    maxInstances: 1,
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: ['--headless', 'disable-gpu', '--window-size=1920x1080'],
            excludeSwitches: ['enable-automation'],
        },
    }],
    debug: true,
    logLevel: 'warn',
    bail: 0,
    baseUrl: 'http://localhost:4200/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        ['chromedriver'],
    ],
    framework: 'jasmine',
    reporters: [
        TestCaseReporter.default
    ],
    jasmineOpts: {
        defaultTimeoutInterval: 60000,
        expectationResultHandler: function(passed, assertion) {},
    },
}
