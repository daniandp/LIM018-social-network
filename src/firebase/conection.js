/* eslint-disable import/no-unresolved */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDd_ToyOT-LhZp2vTrANXRkY-IpkioTsh8',
  authDomain: 'social-twitchtter.firebaseapp.com',
  projectId: 'social-twitchtter',
  storageBucket: 'social-twitchtter.appspot.com',
  messagingSenderId: '541352431844',
  appId: '1:541352431844:web:308d185dc292ef32515cf1',
  measurementId: 'G-1C40NFRP7Q',
};

export const app = initializeApp(firebaseConfig);
