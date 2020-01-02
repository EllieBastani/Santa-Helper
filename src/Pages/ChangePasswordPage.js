import React, { useState } from 'react';

const ChangePasswordPage = (props) => {

  let history = props.history;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successLog, setSuccessLog] = useState(true); 
 
  const id = sessionStorage.getItem('LogInId');
  if ( id===null || id==='')
      setSuccessLog(false);

      const goBack = ()=>{
        history.push('/');
      }

    const ChangePassword = async () => {

      await fetch(`https://santanaghtylist.azurewebsites.net/changePassword/`, {
      method: 'post',
      body: JSON.stringify({
        id,
        oldPassword,
        newPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('LogInToken')
      }
    })  
    .then(res => {
      if( res.status ===200 ) 
      goBack();
      //history.goBack();
        //history.push('/');
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
      <div className="row">
        <div className="col-sm-5">
          <form>
            <h4 className="unsuccessfull" hidden={successLog}> Unsuccessful</h4>
            <h3 className="titleLog">Password Change Form</h3>
            <div className="form-group">
              <label>Current Password:</label>
              <input className="form-control" type="password" 
                value={oldPassword} onChange={(event) => setOldPassword(event.target.value)} />
            </div>
            <div className="form-group">
              <label>New Password:</label>
              <input className="form-control" type="password" 
                value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
            </div>
                <button  type="button" onClick={(e) => {e.preventDefault();ChangePassword();}} className="btn btn-primary buttonLog" >OK</button>
                <button  type="button" onClick={(e) => {e.preventDefault();history.push('/');}} className="btn btn-secondary buttonLog" >Cancel</button>
            </form>
          </div>
        </div>
      </div>
  </React.Fragment>
  )
}

export default ChangePasswordPage;
