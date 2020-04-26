import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button'
import { capitalize } from '../helpers/helpers';

const CreaturesHemisphereSelect = props => {
  const isActive = type => (props.hemisphere === type);

  const handleOnClick = e => (
    props.updateHemisphereType("hemisphere", e.target.dataset.type)
  );

  const renderHemisphereButtons = () => (
    ['north', 'south'].map(type => {

      return <Button
        variant="outline-success"
        size="sm"
        key={`${type}ern-hemisphere`}
        active={isActive(type)}
        data-type={type}
        onClick={handleOnClick}
        className="option-btn"
      >
        {`${capitalize(type)}ern Hemisphere`}
      </Button>
    })
  );


  return (
    <ButtonGroup className="CreaturesHemisphereSelect">
      {renderHemisphereButtons()}
    </ButtonGroup>
  );

}

export default CreaturesHemisphereSelect;
