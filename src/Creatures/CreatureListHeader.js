import React from 'react';
import CreaturesHemisphereSelect from './CreaturesHemisphereSelect';
import CreaturesTypeSelect from './CreaturesTypeSelect';

const CreatureListHeader = props => (
  <div className="CreatureListHeader">
    <CreaturesTypeSelect setCreatureDisplayType={props.setType} />
    TODO: SortButtons <br />
    <CreaturesHemisphereSelect setHemisphereType={props.setType} />
  </div>
);

export default CreatureListHeader;