import React from 'react';
import Creature from '../Creature/Creature';
import Table from 'react-bootstrap/Table';
import ListTableHeader from '../ListTableHeader/ListTableHeader';

import './List.scss';

const List = props => {
  const { creatures, updateSort, sortInfo } = props;
  const renderCreatures = () => (
    creatures.map((c) => (
      <Creature key={c.name} creature={c} />
    ))
  );

  return (
    <Table responsive="xl" striped className="List">
      <ListTableHeader updateSort={updateSort} sortInfo={sortInfo} />
      <tbody>
        {renderCreatures()}
      </tbody>
    </Table>

  );
};

export default List;