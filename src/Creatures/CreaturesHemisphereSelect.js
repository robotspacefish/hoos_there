import React from 'react';
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
      >
        {`${capitalize(type)}ern Hemisphere`}
      </Button>
    })
  );


  return (
    <div className="CreaturesHemisphereSelect">
      {renderHemisphereButtons()}
    </div>
  );

}

export default CreaturesHemisphereSelect;
