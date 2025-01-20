import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router';
import Header from './components/Header.component';
import Authors from './views/Authors.view';
import AuthorPage from './views/AuthorPage.view';
import NewAuthor from './views/NewAuthor.view';
import Blogposts from './views/Blogposts.view';
import BlogPostDetail from './views/BlogPostDetail.view';
import NewPost from './views/NewPost.view';
import { useEffect, useState } from 'react';
import Account from './views/Account.view';
import { useAuth } from '@clerk/clerk-react';


function App() {

const [darkMode, setDarkMode] = useState(true);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [jwt, setJwt] = useState(null);
const { isSignedIn } = useAuth();

useEffect(() => {

  const htmlElement = document.querySelector('html');
    htmlElement.setAttribute('data-bs-theme', 'dark');

  if (!jwt && !!localStorage.getItem("token")){
    setJwt(localStorage.getItem("token"));
  }else if (!!jwt){
    localStorage.setItem("token", jwt);
  }
}, [jwt]);

useEffect(() =>{
  if(isSignedIn){
  setIsLoggedIn(isSignedIn);
  }
  if(isLoggedIn){
    localStorage.setItem("isLoggedIn", true);
  }else{
    localStorage.setItem("isLoggedIn", false)
  }
}, [isSignedIn, isLoggedIn]);

const toggleTheme = () => {
  setDarkMode(prevMode => {
    const newMode = !prevMode;
    const htmlElement = document.querySelector('html');
    htmlElement.setAttribute('data-bs-theme', newMode ? 'dark' : 'light');
    return newMode;
  });
};


  return (
    <div className={`App ${darkMode ? 'theme-dark' : 'theme-light'}`}>
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <Routes>
        <Route path='/' element={<Blogposts />} />
        <Route path='/:page' element={<Blogposts />} />
        <Route path='/blog/:id' element={<BlogPostDetail />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/authors/:id' element={<AuthorPage />} />
        <Route path='/new-author' element={<NewAuthor />} />
        <Route path='/new-article' element={<NewPost />} />
        <Route path='/account' element={isLoggedIn ? (<Account setIsLoggedIn={setIsLoggedIn}/>) : (<h1>Effettua l'accesso</h1>)}  />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;

