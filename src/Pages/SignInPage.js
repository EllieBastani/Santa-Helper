import React, { useState } from 'react';

const SignInPage = (props) => {

  let history = props.history;
  const [userName, setUserName] = useState(''); 
  const [password, setPassword] = useState('');
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
        setSuccessLog(false);
        console.log('error: ' + error);
      });
    };


return (<React.Fragment>
    <div className="container panel panel-default">
      <div className="row">
        <div className="col-sm-4">
          <form>
            <h4 className="unsuccessfull" hidden={successLog}>Login Unsuccessful. Try again!</h4>
            <h3 className="titleLog">Sign In Form</h3>
            <div className="form-group">
              <label>User Name:</label>
              <input className="form-control" type="text" 
                value={userName} onChange={(event) => setUserName(event.target.value)} />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input className="form-control" type="password" 
                value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
                <button  type="button" onClick={(e) => {e.preventDefault();LogIn();}} className="btn btn-primary buttonLog" >OK</button>
                <button  type="button" onClick={(e) => {e.preventDefault();history.push('/');}} className="btn btn-secondary buttonLog" >Cancel</button>
            </form>
          </div>
        </div>
      </div>
  </React.Fragment>
  )
}

export default SignInPage;
