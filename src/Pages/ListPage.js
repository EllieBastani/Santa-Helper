import React from 'react'; 
import earth from '../earth.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';


const ListPage = () => {
    const [contactInfo, setContactInfo] = useState({});
  //  const [persons, setPersons] = useState({});
  const [modifiedChild, setMdifiedChild] = useState();

    useEffect(() => {
      const fetchData = async () => {
        await fetch(`https://santanaghtylist.azurewebsites.net/api/children/`,{
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem('LogInToken')
            }
      
        })
        .then(res => {
          if( res.status !==200 ) 
            throw new Error(res);
          else 
            return res.json();
          })
        .then(
          (result) => {
            setContactInfo(result);
          })
          .catch((error) => {
            console.log('error: ' + error);
          });
    
      }
      fetchData();
    }, []);
    
    const UpdateChildInfo = async (child) => {

      await fetch(`https://santanaghtylist.azurewebsites.net/api/children/${child.id}`,{
        method: 'put',
        body: JSON.stringify(child),    
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('LogInToken')
        }
  
    })
    .then(res => {
      if( res.status !==200 ) 
        throw new Error(res);
      else 
        return res.json();
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
};


    let persons = Object.values(contactInfo);

    const setChildNaugthy = (child,isNaughty) =>{
      child.isNaughty = isNaughty;
      setMdifiedChild(child);
      UpdateChildInfo(child);
    };
    
  
  return (
    <React.Fragment >
      <div className=" container">
        <h3></h3>
      </div>
    <div className=" santaList">
    <table className="table table-striped table-dark table-bordered">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Attitude</th>
            <th>Birthday</th>
            <th>User Name</th>
            <th>Email</th>
            <th >Map</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
        {persons.map((person, key) => (
        <tr >
            <td>
            <h6>{person.firstName} {person.lastName}</h6>
            </td>
            <td>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className={person.isNaughty? 'btn btn-secondary': 'btn btn-success'} onClick={(e) => {if (person.isNaughty) setChildNaugthy(person,false);}}>Nice</button>
                <button type="button" className={person.isNaughty? 'btn btn-danger': 'btn btn-secondary'} onClick={(e) => {if (!person.isNaughty) setChildNaugthy(person,true);}}>Naughty</button>
              </div>
            </td>
            <td>
            <h6>{person.birthDate.slice(0, person.birthDate.indexOf("T"))}</h6>
            </td>
            <td>
            <h6>{person.userName}</h6>
            </td>
            <td>
            <h6>{person.email}</h6>
            </td>
            <td className="thumbnail">
              <Link key={key} to={`/mapPage/${ person.latitude}/${ person.longitude}`}>
              <img src={earth} className="earth-logo " alt="logo" />
              </Link>
            </td>
            <td>
            <h6>{person.street}, {person.city}, {person.province}, {person.country}</h6>
            </td>
            <td>
            <h6>{person.postalCode}</h6>
            </td>
            <td>
            <h6>{person.dateCreated.slice(0, person.dateCreated.indexOf("T"))}</h6>
            </td>
        </tr>
       ))} 
        </tbody>
    </table>
    </div>
    </React.Fragment>
  )
}
export default ListPage;
