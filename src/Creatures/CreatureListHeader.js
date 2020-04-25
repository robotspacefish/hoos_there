import React from 'react';
import CreaturesHemisphereSelect from './CreaturesHemisphereSelect';

const CreatureListHeader = props => (
  <div className="CreatureListHeader">
    TODO: TypeButtons <br />
    TODO: SortButtons <br />
    <CreaturesHemisphereSelect setHemisphereType={props.setType} />
  </div>
);

export default CreatureListHeader;