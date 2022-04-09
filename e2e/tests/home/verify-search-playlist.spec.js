const { validateNextPrevious } = require("../helpers/TrackHelper");

describe('Example', () => {

  before(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await element(by.id('search-bar')).clearText();
    await element(by.id('search-bar')).typeText('arijit singh');
  });

  it('validate results, play track and move to next-previous for playlists', async () => {
    await expect(element(by.id('playlists-tab'))).toBeVisible();
    await element(by.id('playlists-tab')).tap();
    
    await expect(element(by.id('play-list'))).toBeVisible();
    await waitFor(element(by.id('play-list'))).toBeVisible()
        .whileElement(by.id('playlist-0'))
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
