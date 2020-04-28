import React from 'react';
import Creature from './Creature';
import Table from 'react-bootstrap/Table';
import CreatureListTableHeader from './CreatureListTableHeader';

import './Creature.css';

const CreatureList = props => {
  const { creatures, months, hemisphere, updateSort, sortInfo } = props;
  const renderCreatures = () => (
    creatures.map((c) => (
      <Creature key={c.name} creature={c} months={months} hemisphere={hemisphere} />
    ))
  );

  // const renderMonthNames = () => (
  //   months.map(m => <th key={m}>{m}</th>)
  // );

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