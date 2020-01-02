import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const NavBar = (probs) => {

    const [firstName, setFirstName] = useState(''); 
    const [userRole, setUserRole] = useState(''); 

    const logoutFunc = ()=>{
        probs.setLoggedIn(false);
        sessionStorage.clear();
    };

    let role = sessionStorage.getItem('LogInRole');
    if ( role===null) role='';
    
    if ( role !== userRole )
    {
    if ( role===null )
        setUserRole('');
    else
        setUserRole(role);

    const name = sessionStorage.getItem('LogInFirstName');
    if ( name===null )
        setFirstName('');
    else
        setFirstName(name);
    }
    
    const CreateRightSide =  () => {
        if ( probs.loggedIn )
            return(
                <ul className="navbar-nav navbar-collapse justify-content-end">
                    <li  >
                        <h6 className="welcome">Welcome {firstName} ! </h6>
                    </li>
                    <li className="nav-item" >
                        <Link className="nav-link" to="/" onClick={()=>{logoutFunc()}}>Sign out</Link>
                    </li>
                </ul>
            )
        else
        return(
            <ul className="navbar-nav navbar-collapse justify-content-end">
            <li className="nav-item" >
                <Link className="nav-link" to="/signUp">Sign Up</Link>
                </li>
                <li className="nav-item" >
                <Link className="nav-link" to="/logIn">Sign In</Link>
                </li>
            </ul>
        )
      }

  
    return (
  <>
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <a className="navbar-brand" href="/">Santa Helper</a>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/list" hidden={!probs.loggedIn || userRole!=="Admin"} >Santa List</Link>
                </li>
                <li className="nav-item">
                        <Link className="nav-link" to="/contactInfo" hidden={!probs.loggedIn || userRole!=="Child"}>My Contact Information</Link>
                </li>     
                <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                </li>
            </ul>
                { CreateRightSide()}
        </div>
    </nav>
  </>
)}
export default NavBar;
