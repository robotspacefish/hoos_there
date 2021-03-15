import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import OptionButton from '../../OptionButton/OptionButton';
import { capitalize } from '../../../helpers/helpers';
import './HemisphereSelect';

const HemisphereSelect = props => {
  const isActive = type => (props.hemisphere === type);

  const handleOnClick = e => (
    props.updateHemisphereType("hemisphere", e.target.dataset.type)
  );

  const renderHemisphereButtons = () => (
    ['north', 'south'].map(type => {

      return <OptionButton
        variant="outline-success"
        size="sm"
        key={`${type}ern-hemisphere`}
        active={isActive(type)}
        data-type={type}
        onClick={handleOnClick}
      >
        {`${capitalize(type)}ern Hemisphere`}
      </OptionButton >
    })
  );


  return (
    <ButtonGroup className="HemisphereSelect">
      {renderHemisphereButtons()}
    </ButtonGroup>
  );

}

export default HemisphereSelect;
