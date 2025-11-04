const TestCaseReporter = require('systelab-components-wdio-test/src/reporters/test-case.reporter');
const ScreenshotReporter = require('systelab-components-wdio-test/lib/reporters/screenshot.reporter.js');

exports.config = {
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
            args: [
                '--headless=new',
                '--no-sandbox',
                '--disable-gpu',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-web-security',
                '--window-size=1920,1080'
            ],
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
    beforeSession: function (config, capabilities, specs) {
        ScreenshotReporter.ScreenshotReporter.setBasePath('reports/screenshots');
    },
    beforeSuite: function (suite) {
        ScreenshotReporter.ScreenshotReporter.beforeSuite(suite);
    },
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        await ScreenshotReporter.ScreenshotReporter.afterTest(test, context, { error, result, duration, passed, retries });
    },
}
