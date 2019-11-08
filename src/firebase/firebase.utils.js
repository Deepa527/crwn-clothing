import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA6goUaL2SNymUKA6XskbUM1lB-lAuWdFY",
    authDomain: "crwn-db-7559f.firebaseapp.com",
    databaseURL: "https://crwn-db-7559f.firebaseio.com",
    projectId: "crwn-db-7559f",
    storageBucket: "crwn-db-7559f.appspot.com",
    messagingSenderId: "496856104704",
    appId: "1:496856104704:web:e5300d36dab2f5a923bde5",
    measurementId: "G-LEHE4CBJDR"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })

      }catch(error){
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;