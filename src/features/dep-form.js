import React, { useEffect } from 'react';
import useFetch from '../hooks/use-fetch';

export default function Depform () {
    //let filter = [];
    let id = localStorage.getItem("id");
    const {isLoading, response, error, doFetch} = useFetch(`http://localhost:3001/dependants/${id}/deps`);
    const [depData, setdepData] = React.useState([]);
    React.useEffect(() => {
        doFetch({
        method: "get"
        })
    },[])

    React.useEffect(() => {
        console.log(response);
    },[response])

    const handleChange = (e) => {
        let filter = response && response.filter((d)=>{
          return d.name === e.target.value;
      })
        setdepData(filter);
        console.log(depData);
    }

    
    return (
    
        <div>
          <br />
           <div className="d-flex justify-content-center"><h4>View Dependant</h4></div>
           <br />
            <div className="form-group">
                <select name="name" onChange={handleChange} className="form-control">
                <option label="Select Dependant"></option> 
                {response && response.map(k=> {
                return(
                <option key={k.id} value={k.name}>{k.name}</option>
                )})}
                </select>
            </div>
            {depData.map(k=> {
                return(   
            <div key={k.id}>    
            <form>
            <div className="form-group">
              <input type="text"  
              value={k.relationship} 
              className="form-control" disabled />
            </div>

            <div className="form-group">
              <input type="email" 
              value={k.email} 
              className="form-control" disabled />
            </div>

            <div className="form-group">
              <input type="number"
              value={k.contact} 
              className="form-control" disabled />
            </div>

            <div className="form-group">
              <input type="text"
              value={k.bloodgroup} 
              className="form-control" disabled />
            </div>

            <div className="form-group">
              <input type="date" name="dob" 
              onChange={handleChange} 
              value={k.dob} 
              className="form-control" disabled />
            </div>

            <div className="form-group">
              <input type="text"
              value={k.weight} 
              className="form-control" disabled />
            </div>

            <div className="form-group">
              <input type="text"
              value={k.height} 
              className="form-control" disabled />
            </div>
        </form>
        </div>
         )
     })}
        </div>
    )
}