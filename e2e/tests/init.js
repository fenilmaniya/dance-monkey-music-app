const detox = require('detox');
const adapter = require('detox/runners/mocha/adapter');

const config = require('../../package.json').detox;
// const { prepareAndroid } = require('../helpers/app');

before(async () => {
	await Promise.all([detox.init(config, { launchApp: false })]);
	// await prepareAndroid(); // Make Android less flaky
	// await dataSetup()
	// await detox.init(config, { launchApp: false });
	// await device.launchApp({ permissions: { notifications: 'YES' } });
});

beforeEach(async function () {
	await adapter.beforeEach(this);
});

afterEach(async function () {
	await adapter.afterEach(this);
});

after(async () => {
	await detox.cleanup();
});