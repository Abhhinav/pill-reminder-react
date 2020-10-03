import React from 'react';
import { Constant } from '../constants/api_constants';
import { CurrentUserContext } from '../context/user-context';

export default function Logout() {

    const [currentUserState,setCurrentUserState] = React.useContext(CurrentUserContext);
    
    const handleSignOut = (e) => {
      localStorage.removeItem(Constant.AUTH_TOKEN);
      setCurrentUserState(state => ({
        ...state,
        isLoggedIn: false,
        isLoading: false,
        currentUser: null
      }));
    }

    let login = currentUserState.currentUser ?  <Landing /> :<Login /> 
    return(
        {handleSignOut}
    )
}