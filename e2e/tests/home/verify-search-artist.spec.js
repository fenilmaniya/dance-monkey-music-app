const { validateNextPrevious } = require("../helpers/TrackHelper");

describe('Example', () => {

  before(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await element(by.id('search-bar')).clearText();
    await element(by.id('search-bar')).typeText('arijit');
  });

  it('validate results, play track and move to next-previous for artists', async () => {
    await expect(element(by.id('artists-tab'))).toBeVisible();
    await element(by.id('artists-tab')).tap();
    
    await expect(element(by.id('artist-list'))).toBeVisible();
    await waitFor(element(by.id('artist-list'))).toBeVisible()
        .whileElement(by.id('artist-0'))
        .tap();

    await expect(element(by.id('track-list'))).toBeVisible();
    await waitFor(element(by.id('track-list'))).toBeVisible()
        .whileElement(by.id('track-0'))
        .tap();

    await validateNextPrevious();

    await element(by.id('back-button')).tap();
    await element(by.id('back-button')).tap();
  });
});
