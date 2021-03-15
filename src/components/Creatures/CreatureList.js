import React from 'react';
import Creature from './Creature';
import Table from 'react-bootstrap/Table';
import CreatureListTableHeader from './CreatureListTableHeader';

import './Creature.css';

const CreatureList = props => {
  const { creatures, updateSort, sortInfo } = props;
  const renderCreatures = () => (
    creatures.map((c) => (
      <Creature key={c.name} creature={c} />
    ))
  );

  return (
    <Table responsive="xl" striped className="CreatureList">
      <CreatureListTableHeader updateSort={updateSort} sortInfo={sortInfo} />
      <tbody>
        {renderCreatures()}
      </tbody>
    </Table>

  );
};

export default CreatureList;