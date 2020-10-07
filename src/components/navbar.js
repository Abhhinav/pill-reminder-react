import React from 'react';
import {Link} from 'react-router-dom';
import {Constant} from '../constants/api_constants';
import {CurrentUserContext} from '../context/user-context';

export default function NavBar() {
    const [currentUserState,setCurrentUserState] = React.useContext(CurrentUserContext);
    
    const handleSignOut = (e) => {
      e.preventDefault();
      localStorage.removeItem(Constant.AUTH_TOKEN);
      setCurrentUserState(state => ({
        ...state,
        isLoggedIn: false,
        isLoading: false,
        currentUser: null
      }));
    }
    
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/"><i className="fa fa-home" aria-hidden="true"></i>HOME</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item" >
                <Link className="nav-link" to="/profile"><i className="fa fa-user" aria-hidden="true"></i>My Profile</Link>
              </li>
               <li className="nav-item">
                <Link className="nav-link" to="/medical-history"><i className="fa fa-heartbeat" aria-hidden="true"></i>Medical History</Link>
              </li>
            </ul>
             {currentUserState.currentUser && 
             <ul className="nav navbar-nav navbar-right">
               <li>
               <a  onClick={handleSignOut} href="#" className="nav-link">
                Logout {currentUserState.currentUser.email}
              </a>
              </li>
              </ul>
              }
          </div>
        </nav>
    )
  }
  