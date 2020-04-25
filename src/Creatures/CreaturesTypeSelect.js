import React from 'react';
import Button from 'react-bootstrap/Button'

const CreaturesTypeSelect = props => {
  const isActive = type => (props.displayType === type);

  const handleOnClick = e => (props.updateDisplayType("displayType", e.target.dataset.type));

  const renderTypeButtons = () => (
    ['all', 'bug', 'fish'].map(type => {

      return <Button
        variant="outline-success"
        size="sm"
        key={type}
        active={isActive(type)}
        data-type={type}
        onClick={handleOnClick}
      >
        {type.toUpperCase()}
      </Button>
    })
  );

  return (
    <div className="CreaturesTypeSelect">
      {renderTypeButtons()}
    </div>
  );
}

export default CreaturesTypeSelect;

