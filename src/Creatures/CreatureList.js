import React from 'react';
import Creature from './Creature';
import Table from 'react-bootstrap/Table';

const CreatureList = ({ creatures }) => {
  const renderCreatures = () => (
    creatures.map((c, i) => (
      <Creature key={c.name} creature={c} index={i + 1} />
    ))
  );

  return (
    <Table striped responsive hover>
      <thead>
        <tr>
          <td>#</td>
          <td>Name</td>
          <td>Type</td>
          <td>Location</td>
          <td>Shadow Size</td>
          <td>Time Available</td>
          <td>Price</td>
        </tr>
      </thead>
      <tbody>
        {renderCreatures()}
      </tbody>
    </Table>
  );
};

export default CreatureList;