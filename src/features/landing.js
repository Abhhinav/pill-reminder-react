import React from 'react';
import useFetch from '../hooks/use-fetch';
import {CurrentUserContext} from '../context/user-context';
import { Link } from 'react-router-dom';

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
        <div className="d-flex justify-content-center"><h2>Welcome!</h2></div>
        <Link to="/medical-history" className="btn btn-dark">Add Medical History</Link>
        <div>
        <br />
        <br />
          <div>
            <table className="table table-striped table-condensed">
                <thead style={{backgroundColor: 'lightblue'}}>
                  <tr>
                    <th scope="col">Illness</th>
                    <th scope="col">Dr. Name</th>
                    <th scope="col">Medicines</th>
                    <th scope="col">Dosage Amount</th>
                    <th scope="col">Dosage Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {!response &&
                  <h3>No Medical History</h3>
                  }
                { response &&
                   response.map(r => {
                      return (
                  <tr key={r.id}>
                    <td>{r.illness}</td>
                    <td>{r.drname}</td>
                    <td>{r.medicine}</td>
                    <td className="text-center">{r.dosage_amount}</td>
                    <td className="text-center">{r.dosage_frequency}</td>
                  </tr>
                  )})}
            </tbody>
          </table>
          </div>
          </div>
      </div>
    )
}
  