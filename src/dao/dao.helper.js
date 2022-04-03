import firestore from '@react-native-firebase/firestore';

const firestoreDb = firestore();

export const appBaseUrlsRef = () => firestoreDb.collection('V1').doc('URLS');

export const appSecretsRef = () => firestoreDb.collection('V1').doc('SECRETS');