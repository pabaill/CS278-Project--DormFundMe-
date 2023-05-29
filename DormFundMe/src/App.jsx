import './App.css'
import {ThemeProvider, createTheme} from '@mui/material';
import { themeOptions } from './assets/theme/theme';
import DFMNavBar from './assets/components/NavBar/dfm-nav-bar';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import DFMFeed from './assets/components/Feed/dfm-feed';
import DFMProfile from './assets/components/Profile/dfm-profile';
import DFMCalendar from './assets/components/Calendar/dfm-calendar';
import DFMLogin from './assets/components/Login/dfm-login';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQ9BA1IQ5oz04sFNvbaNuWmxI-9SplX9I",
  authDomain: "dormfundme.firebaseapp.com",
  projectId: "dormfundme",
  storageBucket: "dormfundme.appspot.com",
  messagingSenderId: "585850940105",
  appId: "1:585850940105:web:a0f32525a45539e0d63b18",
  measurementId: "G-YRR5QR3N6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const auth = getAuth();

// Initialize Database
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";

function App() {

  useEffect(() => {
    onValue(child(ref(getDatabase()), `posts`), (snapshot) => {
      const data = snapshot.val();
      changePosts(data);
    });
  }, [])

  const theme = createTheme(themeOptions);
  const [currPage, changePage] = useState("/" + document.location.pathname.split('/')[1]);
  const [isLoggedIn, logIn] = useState(false);
  const [posts, changePosts] = useState({});
  const [currentUser, setUser] = useState({});

  const handleLogin = (navigate) => {
    signInWithPopup(auth, provider).then((result) => {
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      const db = getDatabase();
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val())
          setUser(snapshot.val());
        } else {
          // New user; set default values
          const newUser = {
            _id: user.uid,
            realname: user.displayName,
            username: user.email.split('@')[0],
            email: user.email,
            profile_picture : user.photoURL
          }
          set(ref(db, 'users/' + user.uid), newUser);
          setUser(newUser);
        }
        get(child(dbRef, `posts`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log("Found Posts! ", snapshot.val())
            changePosts(snapshot.val());
          } else {
            console.log("Didn't Find Posts!");
          }
          logIn(true);
          changePage("/feed");
          navigate("/feed");
        }).catch((error) => {
          console.error(error);
        });
      }).catch(error => console.error(error));
    }).catch(err => console.log(err));
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        {isLoggedIn ? (
            <DFMNavBar changePage={changePage} currPage={currPage} />
          ) : (
            <Navigate to="/login" replace={true} />
          )
        }
            <div className='dfm-page'>
              <Routes path="/">
                  <Route exact path="login" element={<DFMLogin handleLogin={handleLogin} changePage={changePage}/>} />
                  <Route path="feed" element={<DFMFeed posts={posts} changePosts={changePosts} user={currentUser} />} />
                  <Route path="feed/:post_id" element={<DFMFeed posts={posts} changePosts={changePosts} />} />
                  <Route path="calendar" element={<DFMCalendar posts={posts} />} />
                  <Route path="profile" element={<DFMProfile logIn={logIn} user={currentUser} />} />
                  <Route path="*" element={<Navigate to={isLoggedIn ? "/feed" : "/login"} replace={true} />} />
              </Routes>
            </div>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App
