import React from 'react';
import Creature from './Creature';
import Table from 'react-bootstrap/Table';
import './Creature.css';

const CreatureList = ({ creatures, months, hemisphere }) => {
  const renderCreatures = () => (
    creatures.map((c) => (
      <Creature key={c.name} creature={c} months={months} hemisphere={hemisphere} />
    ))
  );

  const renderMonthNames = () => (
    months.map(m => <th key={m}>{m}</th>)
  );

  return (
    <Table responsive="xl" striped hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Location</th>
          <th>Shadow Size</th>
          <th>Time Available</th>
          <th>Price</th>
          {/* {renderMonthNames()} */}
        </tr>
      </thead>
      <tbody>
        {renderCreatures()}
      </tbody>
    </Table>

  );
};

export default CreatureList;