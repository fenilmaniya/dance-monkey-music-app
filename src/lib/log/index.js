import firebaseAnalytics from '@react-native-firebase/analytics';
import events from './events';

const analytics = firebaseAnalytics || '';

export const logEvent = (eventName, payload) => {
	try {

		analytics().logEvent(eventName, payload);
	} catch (err) {

		console.log(err)
	}
};

export const setCurrentScreen = (currentScreen) => {
	try {

		analytics().logScreenView({ screen_class: currentScreen, screen_name: currentScreen });
	} catch (err) {

		console.log(err)
	}
};

export { events };