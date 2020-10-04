import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/use-fetch';

export default function Profile() {

  const {isLoading, response, error, doFetch} = useFetch("http://localhost:3001/dependants");

  React.useEffect(() => {
    doFetch({
      method: "get"
    })
  },[])

  const [userData, setUserData] = React.useState({
    name: "",
    email: "",
    contact: "",
    bloodgroup: "",
    dob: "",
    weight: "",
    height: ""
  });

    let data = [];
    const [depData, setDepData] = React.useState({
      ...data,
      relationship: "",
      name: "",
      email: "",
      contact: "",
      bloodgroup: "",
      dob: "",
      weight: "",
      height: ""
    });

     React.useEffect(() => {
      console.log(response);
      data = response && response.map(res=>{
         if (res.relationship === depData.relationship)
         return res;
      });
      console.log(data)
    },[response, depData])

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
    setDepData({
      ...depData,
      [e.target.name]: e.target.value
    })
  }

  const handleUserSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(userData));
  }

  const handleDepSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(depData));
    console.log (depData);
  }
    return (
      <div className="d-flex justify-content-around">
        <div className="d-flex justify-content-start">
          <form onSubmit={handleUserSubmit}>
            <h6>My Profile</h6>
            <div className="form-group">
              <input type="text" name="name" 
              onChange={handleChange} placeholder="Name" 
              value={userData.name} className="form-control" />
            </div>

            <div className="form-group">
              <input type="email" name="email" 
              onChange={handleChange} placeholder="Email Address" 
              value={userData.email} className="form-control" />
            </div>

            <div className="form-group">
              <input type="number" name="contact" 
              onChange={handleChange} placeholder="Contact" 
              value={userData.contact} className="form-control" />
            </div>

            <div className="form-group">
              <input type="text" name="bloodgroup" 
              onChange={handleChange} placeholder="Blood Group" 
              value={userData.bloodgroup} className="form-control" />
            </div>

            <div className="form-group">
              <input type="date" name="dob" 
              onChange={handleChange} 
              value={userData.dob} className="form-control" />
            </div>

            <div className="form-group">
              <input type="text" name="weight" 
              onChange={handleChange} placeholder="Weight" 
              value={userData.weight} className="form-control" />
            </div>

            <div className="form-group">
              <input type="text" name="height" 
              onChange={handleChange} placeholder="Height" 
              value={userData.height} className="form-control" />
            </div>

            <div className="d-flex mt-4 justify-content-around">
              <button>Submit</button>
              <Link to="/profile">Cancel</Link>
            </div>
          </form>
          </div>


          <div className="d-flex justify-content-end">
          <form onSubmit={handleDepSubmit}>
            <h6>Add Dependant</h6>

            <div className="form-group">
              <select value={depData.relationship} onChange={handleChange} name="relationship" className="form-control">
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Spouse">Spouse</option>
                <option value="Child">Child</option>
                <option value="Mother In Law">Mother In Law</option>
                <option value="Father In Law">Father In Law</option>
              </select>
            </div>

            <div className="form-group">
              <input type="text" name="name" 
              onChange={handleChange} placeholder="Name" 
              value={depData.name} className="form-control" />
            </div>

            <div className="form-group">
              <input type="email" name="email" 
              onChange={handleChange} placeholder="Email Address" 
              value={depData.email} className="form-control" />
            </div>

            <div className="form-group">
              <input type="number" name="contact" 
              onChange={handleChange} placeholder="Contact" 
              value={depData.contact} className="form-control" />
            </div>

            <div className="form-group">
              <input type="text" name="bloodgroup" 
              onChange={handleChange} placeholder="Blood Group" 
              value={depData.bloodgroup} className="form-control" />
            </div>

            <div className="form-group">
              <input type="date" name="dob" 
              onChange={handleChange} 
              value={depData.dob} className="form-control" />
            </div>

            <div className="form-group">
              <input type="text" name="weight" 
              onChange={handleChange} placeholder="Weight" 
              value={depData.weight} className="form-control" />
            </div>

            <div className="form-group">
              <input type="text" name="height" 
              onChange={handleChange} placeholder="Height" 
              value={depData.height} className="form-control" />
            </div>

            <div className="d-flex mt-4 justify-content-around">
              <button>Submit</button>
              <Link to="/profile">Cancel</Link>
            </div>
          </form>
          </div>
      </div>
    )
}