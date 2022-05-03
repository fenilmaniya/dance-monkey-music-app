const { validateNextPrevious } = require("../../helpers/TrackHelper");

describe('Verify Artist Search', () => {

  before(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await waitFor(element(by.id('search-bar-view'))).toBeVisible().withTimeout(5000);
    await element(by.id('search-bar-view')).tap();
    await element(by.id('search-bar')).clearText();
    await element(by.id('search-bar')).typeText('arijit');
  });

  it('validate results, play track and move to next-previous for artists', async () => {
    await expect(element(by.id('artists-tab'))).toBeVisible();
    await element(by.id('artists-tab')).tap();
    
    await expect(element(by.id('artist-list'))).toBeVisible();
    await waitFor(element(by.id('artist-list'))).toBeVisible().withTimeout(2000);
    await element(by.id('artist-0')).tap();

    await expect(element(by.id('track-list'))).toBeVisible();
    await waitFor(element(by.id('track-list'))).toBeVisible().withTimeout(2000);
    await element(by.id('track-0')).tap();

    await validateNextPrevious();

    await element(by.id('back-button')).tap();
    await element(by.id('back-button')).tap();
  });
});
