import React from 'react';
import {Link} from 'react-router-dom';

export default function MedicalHistory() {

  const [history, setHistory] = React.useState([]);

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
    email_notify: false
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

    setHistory([...history, formData]);
  }

    return (
      <div>
        Medical History

          <form onSubmit={handleSubmit}>

              <input type="text" name="relationship" onChange={handleChange} 
                placeholder="Relationship" value={formData.relationship}/>

              <input type="text"  name="illness"  onChange={handleChange} 
                placeholder="Illness" value={formData.illness}/>

              <input type="text" name="drname" onChange={handleChange} 
                placeholder="Dr. Name" value={formData.drname}/>

              <input type="text" name="medicine" onChange={handleChange} 
                placeholder="Medicine" value={formData.medicine}/>

              <input type="date" name="startdate" onChange={handleChange} 
                value={formData.startdate}/>
              
              <input type="date" name="enddate" onChange={handleChange} 
                value={formData.enddate}/>

              <input type="text" name="dosage_amount" onChange={handleChange} 
                placeholder="Dosage Amount" value={formData.dosage_amount}/>

              <input type="text" name="dosage_frequency" onChange={handleChange} 
                placeholder="Dosage Frequency" value={formData.dosage_frequency}/>

              <input type="time" name="dosage_time" onChange={handleChange} 
              value={formData.dosage_time}/>

              <input type="boolean" name="email_notify" onChange={handleChange} 
              value={formData.email_notify}/>

          <button>Add Medical History</button>

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
                  </tr>
                )
              })}
            </tbody>
          </table>
        </form>
        <div className = "d-flex justify-content-around">
          <button>Save</button>
          <Link to="/medical-history">Cancel</Link>
          </div>
      </div>
    )
}