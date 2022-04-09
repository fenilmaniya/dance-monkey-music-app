const { validateNextPrevious } = require("../helpers/TrackHelper");

describe('Example', () => {

  before(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await element(by.id('search-bar')).clearText();
    await element(by.id('search-bar')).typeText('behti hawa sa tha woh');
  });

  it('validate results, play track and move to next-previous for songs', async () => {
    await expect(element(by.id('songs-tab'))).toBeVisible();
    await element(by.id('songs-tab')).tap();

    await expect(element(by.id('track-list'))).toBeVisible();
    await waitFor(element(by.id('track-list'))).toBeVisible()
        .whileElement(by.id('track-0'))
        .tap();
        
    await validateNextPrevious();

    await element(by.id('back-button')).tap();
  });
});
