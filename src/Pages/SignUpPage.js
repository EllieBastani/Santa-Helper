import React, { useState } from 'react';
//import { useHistory } from "react-router-dom";


const SignUpPage = (props) => {

  let history = props.history;
  const [userName, setUserName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState(''); 
  const [birthDate, setBirthDate] = useState(''); 
  const [street, setStreet] = useState(''); 
  const [city, setCity] = useState(''); 
  const [province, setProvince] = useState(''); 
  const [postalCode, setPostalCode] = useState(''); 
  const [country, setCountry] = useState(''); 
  const [latitude, setLatitude] = useState(0); 
  const [longitude, setLongitude] = useState(0);
  const [successLog, setSuccessLog] = useState(true); 
 
  
  const LogIn = async () => {

    await fetch(`https://santanaghtylist.azurewebsites.net/login/`, {
    method: 'post',
    body: JSON.stringify({
      userName,
      password,
    }),
    headers: {
      'Content-Type': 'application/json'
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
      sessionStorage.setItem('LogInToken', result.token);
      sessionStorage.setItem('LogInRole', result.role);
      sessionStorage.setItem('LogInFirstName', result.firstName);
      sessionStorage.setItem('LogInId', result.id);
      console.log(result);
      history.push('/');
      console.log("went back");
      props.setLoggedIn(true);
      console.log("set log");
  })
    .catch((error) => {
      console.log('error: ' + error);
    });
    }

    const SignUp = async () => {

      await fetch(`https://santanaghtylist.azurewebsites.net/register/`, {
      method: 'post',
      body: JSON.stringify({
        userName,
        email,
        password,
        firstName,
        lastName,
        birthDate,
        street,
        city,
        province,
        postalCode,
        country,
        latitude,
        longitude
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })  
    .then(res => {
      if( res.status ===200 ) 
        return res.json();
      else 
      {
        console.log(res);
        throw new Error(res);
      }
    })
    .then(
      (result) => {
        LogIn();
      })
      .catch((error) => {
        console.log('error: ' + error);
        setSuccessLog(false);
      });
}
  return (<React.Fragment>
    <div className="container panel panel-default">
      <div className="row">
        <h4 className="unsuccessfull" hidden={successLog}>Sign up Unsuccessful.Try again after completing all the fields!</h4>
        <h3 className="titleLog">Sign Up Form</h3>
      </div>
      <div className="row">
        <div className="col-sm-5">
          <div className="form-group">
            <label>User Name:</label>
            <input className="form-control" type="text" 
              value={userName} onChange={(event) => setUserName(event.target.value)}/>
          </div>
          <div className="form-group">
            <label>E_Mail:</label>
            <input className="form-control" type="email" 
              value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input className="form-control" type="password" 
              value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
        </div>
        <div className="col-sm-5">
          <div className="form-group">
            <label>First Name:</label>
            <input className="form-control" type="text" 
              value={firstName} onChange={(event) => setFirstName(event.target.value)} />
          </div>
          <div className="form-group">
            <label>LastName:</label>
            <input className="form-control" type="text" 
              value={lastName} onChange={(event) => setLastName(event.target.value)} />
          </div>
          <div className="form-group">
            <label>Birth Date:</label>
            <input className="form-control" type="date" 
              value={birthDate} onChange={(event) => setBirthDate(event.target.value)} />
          </div>
        </div>
        </div>
        <hr/>
        <div className="row">
        <div className="col-sm-5">
        <div className="form-group">
          <label>Street:</label>
          <input className="form-control" type="text" 
            value={street} onChange={(event) => setStreet(event.target.value)} />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input className="form-control" type="text" 
            value={city} onChange={(event) => setCity(event.target.value)} />
        </div>
        <div className="form-group">
          <label>Province:</label>
          <input className="form-control" type="text" 
            value={province} onChange={(event) => setProvince(event.target.value)} />
        </div>
        <div className="form-group">
          <label>Postal Code:</label>
          <input className="form-control" type="text" 
            value={postalCode} onChange={(event) => setPostalCode(event.target.value)} />
        </div>
        </div>
        <div className="col-sm-5">
        <div className="form-group">
          <label>Country:</label>
          <input className="form-control" type="text" 
            value={country} onChange={(event) => setCountry(event.target.value)} />
        </div>
        <div className="form-group">
          <label>Latitude:</label>
          <input className="form-control" type="number" 
            value={latitude} onChange={(event) => setLatitude(parseFloat(event.target.value))} />
        </div>
        <div className="form-group">
          <label>Longitude:</label>
          <input className="form-control" type="number" 
            value={longitude} onChange={(event) => setLongitude(parseFloat(event.target.value))} />
        </div>
        </div>
        </div>
        <button  type="button" onClick={(e) => {e.preventDefault();SignUp();}} className="btn btn-primary buttonLog" >OK</button>
        <button  type="button" onClick={(e) => {e.preventDefault();history.push('/');}} className="btn btn-secondary buttonLog" >Cancel</button>
    </div>
  </React.Fragment>
  )
}

export default SignUpPage;

