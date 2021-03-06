import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import OptionButton from '../../OptionButton/OptionButton';
import './TypeSelect.scss';

const TypeSelect = props => {
  const isActive = type => (props.displayType === type);

  const handleOnClick = e => (props.updateDisplayType("displayType", e.target.dataset.type));

  const renderTypeButtons = () => (
    ['all', 'bug', 'fish'].map(type => {

      return <OptionButton
        variant="outline-success"
        size="sm"
        key={type}
        active={isActive(type)}
        data-type={type}
        onClick={handleOnClick}
      >
        {type.toUpperCase()}
      </OptionButton>
    })
  );

  return (
    <ButtonGroup className="TypeSelect">
      {renderTypeButtons()}
    </ButtonGroup>
  );
}

export default TypeSelect;

