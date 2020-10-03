import React from 'react';
import {Link} from 'react-router-dom';
import { CurrentUserContext } from '../context/user-context';
import useFetch from '../hooks/use-fetch';

export default function MedicalHistory() {
  const [currentUserState, setCurrentUserState] = React.useContext(CurrentUserContext);
  const {isLoading, response, error, doFetch} = useFetch("http://localhost:3001/medical_histories");
  const [history, setHistory] = React.useState([]);
  const [show, setShow] = React.useState(false)
  const [formData, setFormData] = React.useState({
    relationship: "",
    illness: "",
    drname: "",
    medicine: "",
    startdate: "",
    enddate: "",
    dosage_amount: "",
    dosage_frequency: "",
    dosage_time: "",
    email_notify: "",
    user_id: currentUserState.currentUser.id
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData));
    console.log(formData.user_id);
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
          user_id: formData.user_id
      }})
    })

    setHistory([...history, formData]);
    setShow(prev => !prev)
  }
  const handleClick = () => {
    setFormData("");
    setShow(p => !p)
  }

    return (
      <div>
        Medical History
        <button onClick={handleClick}>Add Medical History</button>
          <form onSubmit={handleSubmit}>
          <table className="table table-striped table-condensed">
            <thead>
              <tr>
                <th scope="col">Relationship</th>
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
              { show && 
              <tr>
                <td>
                  <input type="text" name="relationship" onChange={handleChange} 
                  placeholder="Relationship" value={formData.relationship}/>
                </td>
                <td>
                  <input type="text"  name="illness"  onChange={handleChange} 
                  placeholder="Illness" value={formData.illness}/>
                </td>
                <td>
                  <input type="text" name="drname" onChange={handleChange} 
                  placeholder="Dr. Name" value={formData.drname}/>
                </td>
                <td>
                  <input type="text" name="medicine" onChange={handleChange} 
                  placeholder="Medicine" value={formData.medicine}/>
                </td>
                <td>
                  <input type="date" name="startdate" onChange={handleChange} 
                   value={formData.startdate}/>
                </td>
                <td>
                  <input type="date" name="enddate" onChange={handleChange} 
                   value={formData.enddate}/>
                </td>
                <td>
                  <input type="text" name="dosage_amount" onChange={handleChange} 
                  placeholder="Dosage Amount" value={formData.dosage_amount}/>
                </td>
                <td>
                  <input type="text" name="dosage_frequency" onChange={handleChange} 
                  placeholder="Dosage Frequency" value={formData.dosage_frequency}/>
                </td>
                <td>
                  <input type="time" name="dosage_time" onChange={handleChange} 
                  value={formData.dosage_time}/>
                </td>
                <td>
                  <input type="text" name="email_notify" onChange={handleChange} 
                  placeholder ="Notification" value={formData.email_notify}/>
                </td>
              </tr>
              }
              {history.map(h => {
                return (
                  <tr>
                    <td>{h.relationship}</td>
                    <td>{h.illness}</td>
                    <td>{h.drname}</td>
                    <td>{h.medicine}</td>
                    <td>{h.startdate}</td>
                    <td>{h.enddate}</td>
                    <td>{h.dosage_amount}</td>
                    <td>{h.dosage_frequency}</td>
                    <td>{h.dosage_time}</td>
                    <td>{h.email_notify}</td>
                    <td><i className="fa fa-trash"></i></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className = "d-flex justify-content-around">
          <button>Save</button>
          <Link to="/medical-history">Cancel</Link>
          </div>
        </form>
      </div>
    )
}