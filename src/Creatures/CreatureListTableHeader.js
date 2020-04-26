import React from 'react';
import Button from 'react-bootstrap/Button'
const CreatureListTableHeader = props => {
  const renderButtons = () => (
    ['Name', 'Type', 'Location', 'Shadow Size', 'Time Available', 'Price'].map(content => (
      <th><Button variant="outline-success">{content}</Button></th>
    ))
  );

  return (
    <thead className="CreatureListTableHeader">
      <tr>
        {renderButtons()}
      </tr>
    </thead>
  );

}

export default CreatureListTableHeader;