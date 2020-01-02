import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import NavBar from './NavBar';
import HomePage from './Pages/HomePage';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import EditPage from './Pages/EditPage';
import ListPage from './Pages/ListPage';
import ChangePasswordPage from './Pages/ChangePasswordPage';
import MapPage from './Pages/MapPage';
import NotFoundPage from './Pages/NotFoundPage';
import AboutPage from './Pages/AboutPage';
import { createBrowserHistory } from 'history';


import {
	Router,
  Route,
  Switch 
} from 'react-router-dom';


const App = ()=> {

  const [loggedIn, setLoggedIn] = useState(false); 
  const [history, setHistory] = useState(createBrowserHistory());
  //const history = createBrowserHistory();
  
  return (
  <Router  history={history} > 
        <switch>
          <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          <Route path="/" component={HomePage} exact />
          <Route exact path='/logIn' render={(props) => 
              <SignInPage {...props} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/signUp"  render={(props) => 
              <SignUpPage {...props} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/list" component={ListPage} />
          <Route path="/contactInfo" component={EditPage} />
          <Route path="/changePassword" component={ChangePasswordPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/mapPage/:lat/:lng" component={MapPage} />
          <Route path="/NotFoundPage" component={NotFoundPage} />
        </switch>
      </Router> 
  );
};

export default App;
