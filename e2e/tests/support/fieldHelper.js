
const getTextByElementId = async (testID) => {
  const ele = await element(by.id(testID)).getAttributes();
  return ele.text;
} 

module.exports = {
  getTextByElementId
};