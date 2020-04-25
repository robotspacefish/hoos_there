import React from 'react';
import CreaturesHemisphereSelect from './CreaturesHemisphereSelect';
import CreaturesTypeSelect from './CreaturesTypeSelect';

const CreatureListHeader = props => (
  <div className="CreatureListHeader">
    <CreaturesTypeSelect
      updateDisplayType={props.updateType}
      displayType={props.displayType}
    />
    TODO: SortButtons <br />
    <CreaturesHemisphereSelect
      updateHemisphereType={props.updateType}
      hemisphere={props.hemisphere}
    />
  </div>
);

export default CreatureListHeader;