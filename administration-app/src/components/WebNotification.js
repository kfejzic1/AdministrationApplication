import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
	apiKey: 'AIzaSyCtT-H-mpqVYCNUtIOFImAkGH1nE5b09y0',
	authDomain: 'administrationapplication.firebaseapp.com',
	projectId: 'administrationapplication',
	storageBucket: 'administrationapplication.appspot.com',
	messagingSenderId: '523890476381',
	appId: '1:523890476381:web:759087a7808f85439054b4',
	measurementId: 'G-EWHH6R3T7Q',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);
