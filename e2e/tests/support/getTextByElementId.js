const { getText } = require('detox-getprops');

async function getTextByElementId(testID) {
  return await getText(element(by.id(testID)));
} 

exports.default = getTextByElementId;