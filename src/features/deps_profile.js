import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/use-fetch';
import Depform from './dep-form';

export default function DepsProfile () {

    const {isLoading, response, error, doFetch} = useFetch("http://localhost:3001/dependants");
    const [showDep, setShowDep] = React.useState(false);
    let id = localStorage.getItem("id");
    
    const [depData, setDepData] = React.useState({
      relationship: "",
      name: "",
      email: "",
      contact: "",
      bloodgroup: "",
      dob: "",
      weight: "",
      height: "",
      user_id: id
    });

  const handleChange = (e) => {
    setDepData({
      ...depData,
      [e.target.name]: e.target.value
    })
  }

  const handleDepSubmit = (e) => {
    e.preventDefault();
    alert("Dependant Added!");
    console.log (depData);
    doFetch({
        method: "post",
        body: JSON.stringify({
          dependant: {
            relationship: depData.relationship,
            name: depData.name,
            email: depData.email,
            contact: depData.contact,
            bloodgroup: depData.bloodgroup,
            dob: depData.dob,
            weight: depData.weight,
            height: depData.height,
            user_id: depData.user_id
        }})
        })
  }
    const toggleView = () => {
        setShowDep(p =>!p)
    }

    return(
        <div className="d-flex justify-content-center">
            {!showDep && 
            <Depform />
            }
            <div><button onClick={toggleView} className="btn btn-outline-primary">Add/View Dependant</button></div>
            <div>
            { showDep &&
          <form onSubmit={handleDepSubmit}>
            <br />
            <div className="d-flex justify-content-center"><h4>Add Dependant</h4></div>
              <br />
            <div className="form-group">
              <input type="text" name="relationship" 
              onChange={handleChange} placeholder="Relationship" 
              value={depData.relationship} className="form-control" required/>
            </div>

            <div className="form-group">
              <input type="text" name="name" 
              onChange={handleChange} placeholder="Name" 
              value={depData.name} className="form-control" required/>
            </div>

            <div className="form-group">
              <input type="email" name="email" 
              onChange={handleChange} placeholder="Email Address" 
              value={depData.email} className="form-control" required/>
            </div>

            <div className="form-group">
              <input type="number" name="contact" 
              onChange={handleChange} placeholder="Contact" 
              value={depData.contact} className="form-control" required/>
            </div>

            <div className="form-group">
              <input type="text" name="bloodgroup" 
              onChange={handleChange} placeholder="Blood Group" 
              value={depData.bloodgroup} className="form-control" required/>
            </div>

            <div className="form-group">
              <input type="date" name="dob" 
              onChange={handleChange} 
              value={depData.dob} className="form-control" required/>
            </div>

            <div className="form-group">
              <input type="text" name="weight" 
              onChange={handleChange} placeholder="Weight" 
              value={depData.weight} className="form-control" required/>
            </div>

            <div className="form-group">
              <input type="text" name="height" 
              onChange={handleChange} placeholder="Height" 
              value={depData.height} className="form-control" required/>
            </div>

            <div className="d-flex mt-4 justify-content-around">
              <button className="btn btn-outline-success">Submit</button>
              <Link to="/" className="btn btn-info">Cancel</Link>
            </div>
          </form>
        }
        </div>
          </div>
    )
}