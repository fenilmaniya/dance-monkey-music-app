const action = require("../support/fieldHelper");

const validateNextPrevious = async () => {
  const currentSong = await action.getTextByElementId('player-track-title');

  await element(by.id('player-next')).tap();
  const nextSong = await action.getTextByElementId('player-track-title');

  await element(by.id('player-previous')).tap();
  await waitFor(element(by.id('player-track-title'))).toBeVisible().withTimeout(2000);
  await expect(element(by.id('player-track-title'))).toHaveText(currentSong);

  await element(by.id('player-next')).tap();
  await waitFor(element(by.id('player-track-title'))).toBeVisible().withTimeout(2000);
  await expect(element(by.id('player-track-title'))).toHaveText(nextSong);

  await element(by.id('player-play-pause')).tap();
  await element(by.id('player-play-pause')).tap();
}

module.exports = {
  validateNextPrevious
}