import React from 'react';
import Landing from './landing';
import Login from './login';
import {CurrentUserContext} from '../context/user-context';

export default function MainApp() {
    const [currentUserState, setCurrentUserState] = React.useContext(CurrentUserContext);
    console.log("CUS: ", currentUserState);
    let ab = currentUserState.currentUser ? localStorage.setItem("id", currentUserState.currentUser.id) : "";
    let landing = currentUserState.currentUser ? <Landing /> : <Login />
    return (
      landing
    )
}