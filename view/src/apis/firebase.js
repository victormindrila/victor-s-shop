import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../configs/firebaseConfig';

firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.GoogleAuthProvider();

export function signInWithGoogle() {
	return firebase.auth().signInWithPopup(provider);
}

export function signInWithEmailAndPassword(email, password) {
	return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function signOut() {
	return firebase.auth().signOut();
}
