import React from 'react';
import Clock from '../Clock/Clock';
import CreaturesComingsAndGoings from '../Creatures/CreaturesComingsAndGoings';
import owl from '../../assets/images/owl.png';
import './Header.scss';

const Header = props => (
  <header>
    <div className="Header__title-container">
      <div>
        <img className="logo" src={owl} alt="Hoo's There logo" />
        <h1 className="title">Hoo's There?</h1>
      </div>

      <h3>Animal Crossing: New Horizons Creature Catching Companion</h3>
    </div>

    <Clock now={props.now} updateCurrentTime={props.updateCurrentTime} startingHour={props.startingHour} />

    <CreaturesComingsAndGoings />
  </header>
);

export default Header;