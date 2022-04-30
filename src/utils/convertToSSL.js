import { Image } from 'react-native';
import { isEmpty } from "lodash";
import NotificationIconImage from '../assets/icons/notification-icon.png';

export default convertToSSL = (url) => {
  if (isEmpty(url)) {
    return Image.resolveAssetSource(NotificationIconImage).uri;
  }

  if (!url.startsWith('https://')) {
    return url.replace('http', 'https');
  }
  
  return url;
}