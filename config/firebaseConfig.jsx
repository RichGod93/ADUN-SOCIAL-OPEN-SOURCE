// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSEGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions();

export function getFileExtension(file) {
  return file.name.substring(file.name.lastIndexOf("."));
}
// profile photo storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(
    storage,
    `profile_images/${currentUser.uid}/` +
    currentUser.uid +
    getFileExtension(file)
  );

  // console.log(fileRef);

  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);

  const url = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL: url });

  setLoading(false);
  // alert("Uploaded file!");
  return url;
}

export { app, auth, db, storage, functions };
