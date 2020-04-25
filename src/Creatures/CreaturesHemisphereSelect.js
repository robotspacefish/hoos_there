import React from 'react';

const CreaturesHemisphereSelect = props => {
  const setActiveClass = type => (props.displayHemisphere === type ? 'active' : '');

  const handleOnClick = e => (
    props.setHemisphereType("hemisphere", e.target.dataset.hemisphere)
  );

  return (
    <div className="CreaturesHemisphereSelect">
      <button className={`hemisphere ${setActiveClass("north")}`} data-hemisphere="north" onClick={handleOnClick}>NORTHERN HEMISPHERE</button>
      <button className={`hemisphere ${setActiveClass("south")}`} data-hemisphere="south" onClick={handleOnClick}>SOUTHERN HEMISPHERE</button>
    </div>
  );

}

export default CreaturesHemisphereSelect;
