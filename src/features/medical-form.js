import React from 'react';
import useFetch from '../hooks/use-fetch';

export default function MedicalForm() {
    const [history, setHistory] = React.useState([]);
    let id = localStorage.getItem("id");
    const [delid, setDelid] = React.useState(1);
    const {isLoading, response, error, doFetch} = useFetch(`http://localhost:3001/medical_histories/${id}/users_with_deps`);
    const {isLoading: isloading2, response: response2 , error: error2, doFetch: doFetch2} = useFetch(`http://localhost:3001/medical_histories/${delid}.json`);
    const {isLoading: isloading3, response: response3 , error: error3, doFetch: doFetch3} = useFetch(`http://localhost:3001/dependants/${id}/deps`);

    const handleDelete = (e) => {
        setDelid(e);
        console.log(e);
        console.log(delid);
        if(window.confirm("Are you sure?"))
        {
          doFetch2({
            method: "delete"
          });
          alert("Item Deleted!");
        }
      }

    React.useEffect(() => {
        doFetch({
            method: "get"
        })
        doFetch3({
          method: "get"
      })
    },[])

    React.useEffect(() => {
        if(response2){
          console.log(history, delid);
          let newhistory=history.filter((item)=>{
              return item.id != delid;
          });
          setHistory(newhistory);
      }
    },[response2])

    const handleChange = (e) => {
      if(response){
      if(e.target.value === 0){
        let self_history = response.filter((s) => {
          return s.dependant_id == null;
        })
        setHistory(self_history);
      }
      else{
      let dep_history = response.filter((d) => {
        return d.dependant_id == e.target.value;
      })
      setHistory(dep_history);
      }
    }
  }


    return(
        <div>
          <div className="form-group">
                    <select onChange={handleChange} 
                    name="relationship" 
                    placeholder="Select Dependant" className="form-control">
                      <option label="Select Dependant"></option>
                      <option value="0">Self</option>
                        {response3 && response3.map(k=>{
                          return(
                          <option value={k.id} key={k.id}>{k.name}</option>
                        )})}
                    </select>
                </div>
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
                <th scope="col" className="text-center">Dosage Time</th>
                <th scope="col">Email Notification</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            {history.map(h => {
            return (
            <tbody key = {h.id}>
                <tr>
                    <td>{h.illness}</td>
                    <td>{h.drname}</td>
                    <td>{h.medicine}</td>
                    <td>{h.startdate}</td>
                    <td>{h.enddate}</td>
                    <td className="text-center">{h.dosage_amount}</td>
                    <td className="text-center">{h.dosage_frequency}</td>
                    <td className="text-center">{h.dosage_time}</td>
                    <td className="text-center"><div>
                    {h.email_notify &&
                        <i className="fa fa-bell"></i>
                    }
                    {!h.email_notify &&
                        <i className="far fa-bell"></i>
                    }
                  </div></td>
                    <td><div><button type="button" className="btn btn-danger" onClick={() => handleDelete(h.id)}>Remove</button></div></td>
                  </tr>
            </tbody>
                )})}
          </table>
        </form>
        </div>
    )
}