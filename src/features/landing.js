import React from 'react';
import useFetch from '../hooks/use-fetch';
import {CurrentUserContext} from '../context/user-context';

export default function Landing() {
    const [currentUserState, setCurrentUserState] = React.useContext(CurrentUserContext);
    const {isLoading, response, error, doFetch} = useFetch(`http://localhost:3001/medical_histories/${currentUserState.currentUser.id}/users`);
    
    React.useEffect(() => {
      doFetch({
        method: "get"
      })
    },[])
    
    React.useEffect(() => {
      console.log("****");
      console.log(response);
    }, [response])
    
    return (
      <div>
        <h4>User Profile</h4>
        <p>Welcome</p>
        <button>Add Medical History</button>
        { response &&
         response.map(r => {
          return (
          <div key={r.id}>
            <table className="table table-striped table-condensed">
                <thead>
                  <tr>
                    <th scope="col">Illness</th>
                    <th scope="col">Dr. Name</th>
                    <th scope="col">Medicines</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Dosage Amount</th>
                    <th scope="col">Dosage Frequency</th>
                    <th scope="col">Dosage Time</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{r.illness}</td>
                    <td>{r.drname}</td>
                    <td>{r.medicine}</td>
                    <td>{r.startdate}</td>
                    <td>{r.enddate}</td>
                    <td>{r.dosage_amount}</td>
                    <td>{r.dosage_frequency}</td>
                    <td>{r.dosage_time}</td>
                  </tr>
            </tbody>
          </table>
          </div>
          )})}
      </div>
    )
}
  