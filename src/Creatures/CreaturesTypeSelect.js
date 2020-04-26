import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
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
        className="option-btn"
      >
        {type.toUpperCase()}
      </Button>
    })
  );

  return (
    <ButtonGroup className="CreaturesTypeSelect">
      {renderTypeButtons()}
    </ButtonGroup>
  );
}

export default CreaturesTypeSelect;

