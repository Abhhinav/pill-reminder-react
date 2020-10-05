import React, { useEffect } from 'react';
import useFetch from '../hooks/use-fetch';

export default function Depform () {
    let filter = [];
    const {isLoading, response, error, doFetch} = useFetch("http://localhost:3001/dependants");
    const [relation, setRelation] = React.useState("Mother");
    const [depData, setdepData] = React.useState([]);
    React.useEffect(() => {
        doFetch({
        method: "get"
        })
    },[])

    React.useEffect(() => {
        console.log(response);
    },[response])

    React.useEffect(()=> {
        filter = response && response.filter(d=>{
            if(d.relationship === relation)
            return d;
        })
        console.log(filter);
    })

    const handleChange = (e) => {
        setRelation(e.target.value)
        setdepData(filter);
        console.log(depData);
    }
    return (
    
        <div>
            <div>
                <select onChange={handleChange}>
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Mother In Law">Mother In Law</option>
                    <option value="Father In Law">Father In Law</option>
                </select>
            </div>
            {depData.map(k=> {
                return(       
            <form>
            <div className="form-group">
              <input type="text"  
              value={k.name} className="form-control" />
            </div>

            <div className="form-group">
              <input type="email" 
              value={k.email} className="form-control" />
            </div>

            <div className="form-group">
              <input type="number"
              value={k.contact} className="form-control" />
            </div>

            <div className="form-group">
              <input type="text"
              value={k.bloodgroup} className="form-control" />
            </div>

            <div className="form-group">
              <input type="date" name="dob" 
              onChange={handleChange} 
              value={k.dob} className="form-control" />
            </div>

            <div className="form-group">
              <input type="text"
              value={k.weight} className="form-control" />
            </div>

            <div className="form-group">
              <input type="text"
              value={k.height} className="form-control" />
            </div>
        </form>

         )
     })}
        </div>
    )
}