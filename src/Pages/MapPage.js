import React  from 'react';
import  { Map, Marker,GoogleApiWrapper } from 'google-maps-react';
import '../App.css';

const MapPage = (props) => {
  return (
  <React.Fragment>
  <div className="panel panel-default">
    <div className="row titleLog">
      <div className="col-2">
        <button  type="button" onClick={(e) => {e.preventDefault();props.history.goBack();}} className="btn float-left" >Back</button>
      </div>
      <div className="col-6">
        <h4 >Map showing Child's Location</h4>
      </div>
    </div>
        <div className="row" >
            <Map
            google={window.google}
            zoom={16}
            initialCenter={props.match.params}
            >
            <Marker position={props.match.params} />
            </Map>
        </div>
         </div>
  </React.Fragment>
  )};
  
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBhwGz_-ONsLngdVOBgCldtRYQy8jXTloc'
})(MapPage); 


