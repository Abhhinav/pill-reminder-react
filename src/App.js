import React from 'react';
import {Link, NavLink, BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import CurrentUserChecker from './components/current-user-checker';
import NavBar from './components/navbar';
import MainApp from './features/mainapp';
import Register from './features/register';
import AuthenticatedRoutes from './components/authenticated-routes';
import Profile from './features/profile';
import MedicalHistory from './features/medical-history';
import './App.css';
import {CurrentUserProvider} from './providers/current-user-provider';

export default function App() {
  return (
   <div className="container-fluid">
    <CurrentUserProvider>
      <CurrentUserChecker>

        <Router>
          <NavBar title="PILLS REMINDER" />
          <Switch>
            <Route path='/' exact>
              <div className="d-flex mt-5 justify-content-center align-items-center">
                <MainApp />
              </div>
            </Route>
            
            <Route path="/register">
              <div 
                className="d-flex mt-5 justify-content-center align-items-center">
                <Register />
              </div>
            </Route>
            
            <AuthenticatedRoutes>
              <Route path="/profile">
                <div 
                  className="d-flex mt-5 justify-content-center align-items-center">
                  <Profile />
                </div>
              </Route>
              <Route path="/medical-history">
                <div 
                  className="d-flex mt-5 justify-content-center align-items-center">
                  <MedicalHistory />
                </div>
              </Route>
            </AuthenticatedRoutes>
          </Switch>
        </Router>
       </CurrentUserChecker>
     </CurrentUserProvider>
    </div>
   )
}

