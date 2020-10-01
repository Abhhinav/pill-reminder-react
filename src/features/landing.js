import React from 'react';
import useFetch from '../hooks/use-fetch';
import {CurrentUserContext} from '../context/user-context';

export default function Landing() {
    const [currentUserState, setCurrentUserState] = React.useContext(CurrentUserContext);
    const {isLoading, response, error, doFetch} = useFetch(`http://localhost:3000/medical_histories/${currentUserState.id}/users`);
    
    React.useEffect(() => {
      doFetch({
        method: "get"
      })
    },[])
    
    React.useEffect(() => {
      console.log(response);
    }, [response])
    
    return (
      <div>
        <h4>User Profile</h4>
        <p>Welcome</p>
        <button>Add Medical History</button>
        { response && response.map(r => {
            return (
              <div key={r.id} className="card mt-2 p-2">
                <h4>{r.drname}</h4>
                <h5>{r.illness}</h5>
              </div>
            )
        })}
      </div>
    )
}
  