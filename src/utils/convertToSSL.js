export default convertToSSL = (url) => {
  if (!url.startsWith('https://')) {
    return url.replace('http', 'https');
  }
  
  return url;
}