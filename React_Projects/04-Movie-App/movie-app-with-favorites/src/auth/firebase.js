import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//* https://firebase.google.com/docs/auth/web/start
//* https://console.firebase.google.com/ => project settings
//! firebase console settings bölümünden firebaseconfig ayarlarını al
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyCg1fCEO8i7MQnM3SiMJPiVcADp_NI9XTw",
//   authDomain: "movie-app-1-6ec44.firebaseapp.com",
//   projectId: "movie-app-1-6ec44",
//   storageBucket: "movie-app-1-6ec44.appspot.com",
//   messagingSenderId: "950886341278",
//   appId: "1:950886341278:web:f4feb188157227da55398f",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// export const createUser = async (email, password, displayName, navigate) => {
//   try {
//     //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
//     let userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     //? kullanıcı profilini güncellemek için kullanılan firebase metodu
//     await updateProfile(auth.currentUser, {
//       displayName: displayName,
//     });
//     navigate("/");
//     toastSuccessNotify("Registered successfully!");
//     console.log(userCredential);
//   } catch (err) {
//     toastErrorNotify(err.message);
//     // alert(err.message);
//   }
// };

// //* https://console.firebase.google.com/
// //* => Authentication => sign-in-method => enable Email/password
// //! Email/password ile girişi enable yap
// export const signIn = async (email, password, navigate) => {
//   try {
//     //? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
//     let userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     navigate("/");
//     toastSuccessNotify("Logged in successfully!");
//     console.log(userCredential);
//     // sessionStorage.setItem("user", JSON.stringify(userCredential.user));
//   } catch (err) {
//     toastErrorNotify(err.message);
//     // alert(err.message);
//   }
// };

// export const logOut = () => {
//   signOut(auth);
//   toastSuccessNotify("Logged out successfully!");
// };

// export const userObserver = (setCurrentUser) => {
//   //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
//   onAuthStateChanged(auth, (currentUser) => {
//     if (currentUser) {
//       const { email, displayName, photoURL } = currentUser;
//       setCurrentUser({ email, displayName, photoURL });
//       sessionStorage.setItem(
//         "user",
//         JSON.stringify({ email, displayName, photoURL })
//       );
//     } else {
//       // User is signed out
//       setCurrentUser(false);
//       sessionStorage.clear();
//     }
//   });
// };

// //* https://console.firebase.google.com/
// //* => Authentication => sign-in-method => enable Google
// //! Google ile girişi enable yap
// //* => Authentication => settings => Authorized domains => add domain
// //! Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle
// export const signUpProvider = (navigate) => {
//   //? Google ile giriş yapılması için kullanılan firebase metodu
//   const provider = new GoogleAuthProvider();
//   //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       console.log(result);
//       navigate("/");
//       toastSuccessNotify("Logged in successfully!");
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       console.log(error);
//     });
// };

// export const forgotPassword = (email) => {
//   //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
//   sendPasswordResetEmail(auth, email)
//     .then(() => {
//       // Password reset email sent!
//       toastWarnNotify("Please check your mail box!");
//       // alert("Please check your mail box!");
//     })
//     .catch((err) => {
//       toastErrorNotify(err.message);
//       // alert(err.message);
//       // ..
//     });
// };
