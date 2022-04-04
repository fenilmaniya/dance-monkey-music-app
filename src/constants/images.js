import { Image } from 'react-native';

import PlayButtonImage from '../assets/icons/play-icon.png';
import PauseButtonImage from '../assets/icons/pause-icon.png';
import NextButtonImage from '../assets/icons/next-icon.png';
import PreviousButtonImage from '../assets/icons/previous-icon.png';
import NotificationIconImage from '../assets/icons/notification-icon.png';

export const PlayButton = Image.resolveAssetSource(PlayButtonImage).uri;
export const PauseButton = Image.resolveAssetSource(PauseButtonImage).uri;
export const NextButton = Image.resolveAssetSource(NextButtonImage).uri;
export const PreviousButton = Image.resolveAssetSource(PreviousButtonImage).uri;
export const NotificationIcon = Image.resolveAssetSource(NotificationIconImage).uri;