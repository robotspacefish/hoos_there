import React from 'react';
import owl from '../assets/images/owl.png';

const Header = () => (
  <header>
    <div>
      <img className="logo" src={owl} alt="Hoo's There logo" />
    </div>
    <h1 className="title">Hoo's There?</h1>
  </header>
);

export default Header;