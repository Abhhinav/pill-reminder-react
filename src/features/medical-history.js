import React from 'react';
import {Link} from 'react-router-dom';
import useFetch from '../hooks/use-fetch';
import MedicalForm from './medical-form';

export default function MedicalHistory() {
  let id = localStorage.getItem("id");
  const [show, setShow] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  const [view, toggleView] = React.useState(false);
  const {isLoading, response, error, doFetch} = useFetch("http://localhost:3001/medical_histories");
  const {isLoading : isLoading2, response : response2, error: error2, doFetch: doFetch2} = useFetch(`http://localhost:3001/dependants/${id}/deps`);
  React.useEffect(() => {
    doFetch2({
        method: "get"
    })
  },[])

  const [formData, setFormData] = React.useState({
    illness: "",
    drname: "",
    medicine: "",
    startdate: "",
    enddate: "",
    dosage_amount: "",
    dosage_frequency: "",
    dosage_time: "",
    email_notify: true,
    user_id: id,
    dependant_id: "" 
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Medical History Saved!");
    doFetch({
      method: "post",
      body: JSON.stringify({
        medical_history: {
          illness: formData.illness,
          drname: formData.drname,
          medicine: formData.medicine,
          startdate: formData.startdate,
          enddate: formData.enddate,
          dosage_amount: formData.dosage_amount,
          dosage_frequency: formData.dosage_frequency,
          dosage_time: formData.dosage_time,
          email_notify: formData.email_notify,
          user_id: formData.user_id,
          dependant_id: formData.dependant_id
      }})
    })

    setHistory([...history, formData]);
    setShow(prev => !prev)
  }

  const handleClick = () => {
    toggleView(true)
    setShow(p => !p)
  }

  const handleForm =  () => {
    toggleView(false)
  }

    return (
      <div>
        <div className="d-flex justify-content-center"><h2>Medical History</h2></div>
        <div>
        <button className="btn btn-primary" onClick={handleForm}>View Medical History</button>
        <button className="btn btn-secondary"onClick={handleClick}>Add Medical History</button>
        </div>
        {!view &&
        <MedicalForm />
        }
        {view &&
          <form onSubmit={handleSubmit}>
            <br />
            {show &&
            <div className="form-group">
                    <select value={formData.dependant_id} onChange={handleChange} 
                    name="dependant_id" placeholder="Select Dependant" className="form-control" required>
                       <option label="Select Dependant"></option>
                       <option value="0">Self</option>
                        {response2 && response2.map(k=>{
                          return(
                          <option value={k.id} key={k.id}>{k.name}</option>
                        )})}
                    </select>
                </div>
              }
          <table className="table table-striped table-condensed">
            <thead style={{backgroundColor: 'lightgrey'}}>
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
              </tr>
            </thead>
            <tbody>
              {show && 
              <tr>
                <td>
                  <div>
                  <input type="text"  name="illness"  onChange={handleChange} 
                  placeholder="Illness" value={formData.illness} required />
                  </div>
                </td>
                <td>
                 <div>
                  <input type="text" name="drname" onChange={handleChange} 
                  placeholder="Dr. Name" value={formData.drname} required />
                  </div>
                </td>
                <td>
                <div>
                  <input type="text" name="medicine" onChange={handleChange} 
                  placeholder="Medicine" value={formData.medicine} required/>
                  </div>
                </td>
                <td>
                <div>
                  <input type="date" name="startdate" onChange={handleChange} 
                   value={formData.startdate} required/>
                   </div>
                </td>
                <td>
                <div>
                  <input type="date" name="enddate" onChange={handleChange} 
                   value={formData.enddate} required/>
                   </div>
                </td>
                <td>
                <div>
                  <input type="text" name="dosage_amount" onChange={handleChange} 
                  placeholder="Dosage Amount" value={formData.dosage_amount} required/>
                  </div>
                </td>
                <td>
                <div>
                  <input type="text" name="dosage_frequency" onChange={handleChange} 
                  placeholder="Dosage Frequency" value={formData.dosage_frequency} required/>
                  </div>
                </td>
                <td>
                <div>
                  <input type="time" name="dosage_time" onChange={handleChange} 
                  value={formData.dosage_time} required/>
                  </div>
                </td>
                <td>
                  <div>
                    <select value={formData.email_notify} 
                    name="email_notify" onChange={handleChange}>
                        <option value="true">ON</option>
                        <option value="false">OFF</option>
                    </select>
                  </div>
                </td>
              </tr>
              }
              {history.map(h => {
                return (
                  <tr key = {h.id}>
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
                        <i className="fa fa-bell" ></i>
                    }
                    {!h.email_notify &&
                        <i className="far fa-bell"></i>
                    }
                  </div></td>
                  </tr>
              )})}
            </tbody>
          </table>
          {show &&
          <div className = "d-flex justify-content-around">
          <button className = "btn btn-outline-success">Save</button>
          <Link to="/" className="btn btn-info">Cancel</Link>
          </div>
          }
        </form>
      }
      </div>
    )
}