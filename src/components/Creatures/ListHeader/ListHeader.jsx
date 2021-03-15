import React from 'react';
import HemisphereSelect from '../HemisphereSelect/HemisphereSelect';
import TypeSelect from '../TypeSelect/TypeSelect';

const ListHeader = props => (
  <div className="ListHeader">
    <TypeSelect
      updateDisplayType={props.updateType}
      displayType={props.displayType}
    />

    <HemisphereSelect
      updateHemisphereType={props.updateType}
      hemisphere={props.hemisphere}
    />
  </div>
);

export default ListHeader;