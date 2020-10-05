import React from 'react';
import useFetch from '../hooks/use-fetch';

export default function MedicalForm() {
    const [history, setHistory] = React.useState([]);
    let id = localStorage.getItem("id");
    const [delid, setDelid] = React.useState(1);
    const {isLoading, response, error, doFetch} = useFetch(`http://localhost:3001/medical_histories/${id}/users_with_deps`);
    const {isLoading: isloading2, response: response2 , error: error2, doFetch: doFetch2} = useFetch(`http://localhost:3001/medical_histories/${delid}.json`);

    React.useEffect(() => {
        doFetch({
            method: "get"
        })
    },[])

    React.useEffect(() => {
        console.log(response);
         if(response)
         setHistory(response);
    },[response])

    React.useEffect(() => {
        console.log(response2);
    },[response2])

    const handleDelete = (e) => {
        setDelid(e);
        console.log(e);
        console.log(delid);
        alert("Item Deleted!");
        doFetch2({
          method: "delete"
        });
      }

    return(
        <div>
        <form>
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
                <th scope="col">Email Notification</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
            {history.map(h => {
                return (
                  <tr key = {h.id}>
                    <td>{h.illness}</td>
                    <td>{h.drname}</td>
                    <td>{h.medicine}</td>
                    <td>{h.startdate}</td>
                    <td>{h.enddate}</td>
                    <td>{h.dosage_amount}</td>
                    <td>{h.dosage_frequency}</td>
                    <td>{h.dosage_time}</td>
                    <td>{h.email_notify}</td>
                    <td><div><button type="button" className="btn btn-primary" onClick={() => handleDelete(h.id)}>Remove</button></div></td>
                  </tr>
              )})}
            </tbody>
          </table>
        </form>
        </div>
    )
}