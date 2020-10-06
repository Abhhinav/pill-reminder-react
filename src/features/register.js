import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import useFetch from '../hooks/use-fetch';

export default function Register() {

  const {isLoading, response, error, doFetch} = useFetch("http://localhost:3001/users.json");
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    contact: "",
    country: "",
    dob: "",
    pwd: "",
    cpwd: "",
    bloodgroup: "",
    weight: "",
    height: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
   if(formData.cpwd === formData.pwd){
    doFetch({
      method: "post",
      body: JSON.stringify({
        user: {
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          country: formData.country,
          dob: formData.dob,
          password: formData.pwd,
          weight: formData.weight,
          bloodgroup: formData.bloodgroup,
          height: formData.height
        }
      })
    })
    alert("User Registered!");
  }
  else
  alert("Passwords didn't match!")
  }

    return (
      <div style={{maxWidth:"400px"}}>
        <div className="d-flex justify-content-center">
        <h4>Registration</h4>
        </div>
        <div className="card p-4">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" name="name" 
              onChange={handleChange} placeholder="Name" 
              value={formData.name} className="form-control" required/>
            </div>

            <div className="form-group">
              <input type="email" name="email" 
              onChange={handleChange} placeholder="Email Address" 
              value={formData.email} className="form-control" required/>
            </div>

            <div className="form-group">
              <input type="number" name="contact" 
              onChange={handleChange} placeholder="Contact" 
              value={formData.contact} className="form-control" required/>
            </div>

            <div className="form-group">
              <input type="text" name="country" 
              onChange={handleChange} placeholder="Country" 
              value={formData.country} className="form-control" required/>
            </div>

            <div className="form-group">
              <input type="date" name="dob" 
              onChange={handleChange} 
              value={formData.dob} className="form-control" required/>
            </div>

            <div className="form-group">
              <input type="password" name="pwd" 
              onChange={handleChange} placeholder="Password" 
              value={formData.pwd} className="form-control" required/>
            </div>

            <div className="form-group">
              <input type="password" name="cpwd" 
              onChange={handleChange} placeholder="Confirm Password" 
              value={formData.cpwd} className="form-control" required/>
            </div>

            <div className="form-group">
              <input type="text" name="bloodgroup" 
              onChange={handleChange} placeholder="Blood Group" 
              value={formData.bloodgroup} className="form-control" required/>
            </div>

            <div className="form-group">
              <input type="text" name="weight" 
              onChange={handleChange} placeholder="Weight" 
              value={formData.weight} className="form-control" required/>
            </div>

            <div className="form-group">
              <input type="text" name="height" 
              onChange={handleChange} placeholder="Height" 
              value={formData.height} className="form-control" required/>
            </div>

            <div className="d-flex mt-4 justify-content-around">
              <button className="btn btn-outline-success">Register</button>
              <Link to="/" className="btn btn-info">Back</Link>
            </div>
          </form>
          </div>
      </div>
    )
}