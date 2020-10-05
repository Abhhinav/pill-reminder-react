import React from 'react';
import { Link } from 'react-router-dom';

export default function MyProfile () {

    const [userData, setUserData] = React.useState({
        name: "",
        email: "",
        contact: "",
        bloodgroup: "",
        dob: "",
        weight: "",
        height: ""
      });

      const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
          })
      }

      const handleUserSubmit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(userData));
      }

    return (
            
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
    )
}