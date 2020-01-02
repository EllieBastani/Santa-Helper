import React  from 'react';
import santa from '../santa2.jpg';

const AboutPage = (props) => {
  return (
  <React.Fragment>
  <div className="panel panel-default">
    <div className="row titleLog">
      <div className="col-2">
        <button  type="button" onClick={(e) => {e.preventDefault();props.history.goBack();}} className="btn float-left" >Back</button>
      </div>
      <div className="col-6">
        <h4 >About Santa Helper App</h4>
      </div>
    </div>
    <div className="row" >
        <div className="container col-6 ">
            <br/>
        <h6> Santa can log in and see the list of children, their location and set their Attitude if they have been naughty.</h6>
        <br/>
        <h6> Children can sign up and fill their information to be on Santa list .</h6>
        <h6> Children can also log in and see their information and change them .</h6>
        </div>
        <div className="col-4">
        <img src={santa} className="App-logo" alt="logo" />
        </div> 
    </div>
 </div>
  </React.Fragment>
  )}
  
export default AboutPage; 


