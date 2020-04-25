import React from 'react';
import CreaturesHemisphereSelect from './CreaturesHemisphereSelect';
import CreaturesTypeSelect from './CreaturesTypeSelect';

const CreatureListHeader = props => (
  <div className="CreatureListHeader">
    <CreaturesTypeSelect updateDisplayType={props.updateType} />
    TODO: SortButtons <br />
    <CreaturesHemisphereSelect updateHemisphereType={props.updateType} />
  </div>
);

export default CreatureListHeader;