import './App.css'
import {ThemeProvider, createTheme} from '@mui/material';
import { themeOptions } from './assets/theme/theme';
import DFMNavBar from './assets/components/NavBar/dfm-nav-bar';
import { useState } from 'react';
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
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const auth = getAuth();

function App() {
  // Dummy posts for testing
  const sample_desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor at auctor urna nunc. Sit amet luctus venenatis lectus magna. Nisl nunc mi ipsum faucibus. Vel risus commodo viverra maecenas. Leo vel orci porta non pulvinar neque. "
  const stock_img = "https://images.megapixl.com/2219/22193936.jpg";
  const default_posts = [{
    title: "Floor Dinner",
    location: "Yost",
    benefit: "Yost Residents",
    date: new Date("05-09-2023"),
    author: "@anon-aardvark",
    description: sample_desc,
    image: stock_img,
    upvotes: 10,
},
{
    title: "Ping Pong Tournament",
    location: "Yost",
    benefit: "Yost Residents",
    upvotes: 4,
    date: new Date("05-23-2023"),
    author: "@some-guy",
    description: sample_desc,
    image: stock_img
},
{
    title: "Clothing Swap",
    location: "Yost",
    benefit: "Yost Residents",
    upvotes: 2,
    date: new Date("05-14-2023"),
    author: "@third-floor-phantom",
    description: sample_desc,
    image: stock_img
},
{
  title: "Event 1",
  location: "Yost",
  benefit: "Yost Residents",
  upvotes: 2,
  date: new Date("05-19-2023"),
  author: "@third-floor-phantom",
  description: sample_desc,
  image: stock_img
},
{
  title: "Event 2",
  location: "Yost",
  benefit: "Yost Residents",
  upvotes: 2,
  date: new Date("05-19-2023"),
  author: "@third-floor-phantom",
  description: sample_desc,
  image: stock_img
}
];

  const theme = createTheme(themeOptions);
  const [currPage, changePage] = useState("/" + document.location.pathname.split('/')[1]);
  const [isLoggedIn, logIn] = useState(false);
  const [posts, changePosts] = useState(default_posts);
  const [currentUser, setUser] = useState({});

  const handleLogin = (navigate) => {
    signInWithPopup(auth, provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log(user);
    setUser(user);
    logIn(true);
    changePage("/feed");
    navigate("/feed");
    }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    });
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
                  <Route path="feed" element={<DFMFeed posts={posts} changePosts={changePosts} />} />
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
