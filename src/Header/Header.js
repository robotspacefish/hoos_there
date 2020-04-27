import React from 'react';
import Clock from '../Clock/Clock';
import owl from '../assets/images/owl.png';

const Header = props => (
  <header>
    <div className="Header__title-container">
      <div>
        <img className="logo" src={owl} alt="Hoo's There logo" />
      </div>
      <h1 className="title">Hoo's There?</h1>
    </div>
    <Clock now={props.now} updateCurrentTime={props.updateCurrentTime} />
  </header>
);

export default Header;