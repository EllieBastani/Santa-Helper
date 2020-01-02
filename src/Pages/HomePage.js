import React from 'react';
import logo from '../santa.jpg';
import '../App.css';


const HomePage = () => (
<React.Fragment>
<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>
          Santa Helper makes it easy for Santa to see who has been naughty.
        </h3>
      </header>
</div>
</React.Fragment>
);

export default HomePage;
