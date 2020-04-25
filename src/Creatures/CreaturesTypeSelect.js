import React from 'react';

const CreaturesTypeSelect = props => {
  const setActiveClass = type => (props.displayType === type ? 'active' : '');

  const handleOnClick = e => (props.updateDisplayType("displayType", e.target.dataset.type));

  const renderTypeButtons = () => (
    ['all', 'bugs', 'fish'].map(type => {

      const classNames = `type-btn ${setActiveClass(type)}`;
      return <button
        key={type}
        className={classNames}
        data-type={type}
        onClick={handleOnClick}
      >
        {type.toUpperCase()}
      </button>
    })
  );

  return (
    <div className="CreaturesTypeSelect">
      {renderTypeButtons()}
    </div>
  );
}

export default CreaturesTypeSelect;

