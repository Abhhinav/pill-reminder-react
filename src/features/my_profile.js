import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/use-fetch';

export default function MyProfile () {
    let id = localStorage.getItem("id");
    const {isLoading, response, error, doFetch} = useFetch(`http://localhost:3001/users/${id}`,);
    const [edit, setEdit] = React.useState(false);
    React.useEffect(() => {
        doFetch({
        method: "get"
        })
    },[])

    React.useEffect(() => {
        console.log(response);
        if(response)
        setUserData(response)
      },[response])

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
        doFetch({
            method: "put",
            body: JSON.stringify({
                name: userData.name,
                email: userData.email,
                contact: userData.contact,
                country: userData.country,
                dob: userData.dob,
                weight: userData.weight,
                bloodgroup: userData.bloodgroup,
                height: userData.height
              }
            )
          })
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