import React, { useState }  from 'react';
import { useEffect } from 'react';

const EditPage = (props) => {

  let history = props.history;
  const [id, setId] = useState(''); 
  const [userName, setUserName] = useState(''); 
  const [email, setEmail] = useState(''); 
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
  const [fieldsDisable, setFieldsDisable] = useState(true);
  
  useEffect(() => {
    const fetchData = async (LoggedInId) => {
      await fetch(`https://santanaghtylist.azurewebsites.net/api/children/${LoggedInId}`,{
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
            setId(result.id);
            setUserName(result.userName);
            setEmail(result.email);
            setFirstName(result.firstName);
            setLastName(result.lastName);
            setBirthDate(result.birthDate);
            setStreet(result.street);
            setCity(result.city);
            setProvince(result.province);
            setPostalCode(result.postalCode);
            setCountry(result.country);
            setLatitude(result.latitude);
            setLongitude(result.longitude);
    
            console.log('got the info ');
        })
        .catch((error) => {
          console.log('error: ' + error);
        });
  
    }

    const LoggedInId = sessionStorage.getItem('LogInId');
    if ( LoggedInId===null || LoggedInId==='')
        setSuccessLog(false);
    else
        fetchData(LoggedInId);
  }, []);

  const UpdateChildInfo = async () => {

    await fetch(`https://santanaghtylist.azurewebsites.net/api/children/${id}`,{
      method: 'put',
      body: JSON.stringify({
          id,
        userName,
        email,
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
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('LogInToken')
      }

  })
  .then(res => {
    if( res.status ===200 ) 
    {
        setSuccessLog(true);
        setFieldsDisable(true);
    }
    else 
        throw new Error(res);
    })
    .catch((error) => {
      setSuccessLog(false);
      console.log('error: ' + error);
    });
};



  return (<React.Fragment>
    <div className="container panel panel-default">
        <div className="row topButton">
            <div className="col-5">
            <button  type="button" onClick={(e) => {e.preventDefault();history.push('/');}} className="btn float-left" >Back</button>
            </div>
            <div className="col-5">
            <button  type="button" onClick={(e) => {e.preventDefault();setFieldsDisable(false);}} className="btn btn-primary float-right" >Edit</button>
            </div>
        </div>
        <div className="row">
            <h4 className="unsuccessfull" hidden={successLog}>Could not retrieve data.</h4>
            <h3 className="titleLog">Contact Information Form</h3>
        </div>
      <div className="row">
        <div className="col-sm-5">
          <div className="form-group">
            <label>User Name:</label>
            <input className="form-control" type="text" disabled = {fieldsDisable}
              value={userName || ''} onChange={(e)=>{setUserName ( e.target.value);}} />
          </div>
          <div className="form-group">
            <label>E_Mail:</label>
            <input className="form-control" type="email"  disabled = {fieldsDisable}
              value={email || ''} onChange={(e)=>{setEmail ( e.target.value);}} />
          </div>
          <div className="form-group">
          <button  type="button" disabled = {fieldsDisable} onClick={(e) => {e.preventDefault();history.push('/changePassword')}} className="btn btn-primary topButton" >Change Password</button>
          </div>
        </div>
        <div className="col-sm-5">
          <div className="form-group">
            <label>First Name:</label>
            <input className="form-control" type="text"  disabled = {fieldsDisable}
              value={firstName || ''} onChange={(e)=>{setFirstName ( e.target.value);}} />
          </div>
          <div className="form-group">
            <label>LastName:</label>
            <input className="form-control" type="text"  disabled = {fieldsDisable}
              value={lastName || ''} onChange={(e)=>{setLastName ( e.target.value);}} />
          </div>
          <div className="form-group">
            <label>Birth Date:</label>
            <input className="form-control" type="date"   disabled = {fieldsDisable} 
              value={birthDate? birthDate.slice(0, 10) : ''} onChange={(e)=>{setBirthDate ( e.target.value);}} />
          </div>
        </div>
        </div>
        <hr/>
        <div className="row">
        <div className="col-sm-5">
        <div className="form-group">
          <label>Street:</label>
          <input className="form-control" type="text"  disabled = {fieldsDisable}
            value={street || ''} onChange={(e)=>{setStreet ( e.target.value);}} />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input className="form-control" type="text"  disabled = {fieldsDisable}
            value={city || ''} onChange={(e)=>{setCity ( e.target.value);}} />
        </div>
        <div className="form-group">
          <label>Province:</label>
          <input className="form-control" type="text"  disabled = {fieldsDisable}
            value={province || ''} onChange={(e)=>{setProvince ( e.target.value);}} />
        </div>
        <div className="form-group">
          <label>Postal Code:</label>
          <input className="form-control" type="text"  disabled = {fieldsDisable}
            value={postalCode || ''} onChange={(e)=>{setPostalCode( e.target.value);}} />
        </div>
        </div>
        <div className="col-sm-5">
        <div className="form-group">
          <label>Country:</label>
          <input className="form-control" type="text" disabled = {fieldsDisable} 
            value={country || ''} onChange={(e)=>{setCountry( e.target.value);}} />
        </div>
        <div className="form-group">
          <label>Latitude:</label>
          <input className="form-control" type="number" disabled = {fieldsDisable} 
            value={latitude || ''} onChange={(e)=>{setLatitude(parseFloat(e.target.value));}} />
        </div>
        <div className="form-group">
          <label>Longitude:</label>
          <input className="form-control" type="number"  disabled = {fieldsDisable}
            value={longitude || ''} onChange={(e)=>{setLongitude(parseFloat(e.target.value));}} />
        </div>

        </div>
        </div>
        <button  hidden = {fieldsDisable} type="button" onClick={(e) => {e.preventDefault();UpdateChildInfo();}} className="btn btn-primary buttonLog" >OK</button>
        <button  hidden = {fieldsDisable} type="button" onClick={(e) => {e.preventDefault();setFieldsDisable(true);}} className="btn btn-secondary buttonLog" >Cancel</button>
    </div>
  </React.Fragment>
  )
}

export default EditPage;

