import React from 'react';
import {Link} from 'react-router-dom';
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
    cpwd: ""
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
        }
      })
    })
  }

    return (
      <div style={{maxWidth:"400px"}}>
        <div className="d-flex justify-content-center">
        <h4>Registration</h4>
        </div>
        <div className="card p-4">
          <form onSubmit={handleSubmit}>
            <h6>Enter the details to register</h6>
            <div className="form-group">
              <input type="text" name="name" 
              onChange={handleChange} placeholder="Name" 
              value={formData.name} className="form-control" />
            </div>

            <div className="form-group">
              <input type="email" name="email" 
              onChange={handleChange} placeholder="Email Address" 
              value={formData.email} className="form-control" />
            </div>

            <div className="form-group">
              <input type="number" name="contact" 
              onChange={handleChange} placeholder="Contact" 
              value={formData.contact} className="form-control" />
            </div>

            <div className="form-group">
              <input type="text" name="country" 
              onChange={handleChange} placeholder="Country" 
              value={formData.country} className="form-control" />
            </div>

            <div className="form-group">
              <input type="date" name="dob" 
              onChange={handleChange} 
              value={formData.dob} className="form-control" />
            </div>

            <div className="form-group">
              <input type="password" name="pwd" 
              onChange={handleChange} placeholder="Password" 
              value={formData.pwd} className="form-control" />
            </div>

            <div className="form-group">
              <input type="password" name="cpwd" 
              onChange={handleChange} placeholder="Confirm Password" 
              value={formData.cpwd} className="form-control" />
            </div>

            <div className="d-flex mt-4 justify-content-around">
              <button>Register</button>
              <Link to="/">Back</Link>
            </div>
          </form>
          </div>
      </div>
    )
}