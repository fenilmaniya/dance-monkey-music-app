const { validateNextPrevious } = require("../../helpers/TrackHelper");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Verify Album Search', () => {

  before(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await waitFor(element(by.id('search-bar-view'))).toBeVisible().withTimeout(5000);
    await element(by.id('search-bar-view')).tap();
    await element(by.id('search-bar')).clearText();
    await element(by.id('search-bar')).typeText('3 idiots');
  });
  
  it('validate results, play track and move to next-previous for albums', async () => {
    await expect(element(by.id('albums-tab'))).toBeVisible();
    await element(by.id('albums-tab')).tap();
    
    await expect(element(by.id('album-list'))).toBeVisible();
    await waitFor(element(by.id('album-list'))).toBeVisible().withTimeout(2000);
    await element(by.id('album-0')).tap();

    await expect(element(by.id('track-list'))).toBeVisible();
    await waitFor(element(by.id('track-list'))).toBeVisible().withTimeout(2000);
    await element(by.id('track-0')).tap();

    await validateNextPrevious();

    await element(by.id('back-button')).tap();
    await element(by.id('back-button')).tap();
  });
});
