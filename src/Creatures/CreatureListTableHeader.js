import React from 'react';
import Button from 'react-bootstrap/Button';

const CreatureListTableHeader = ({ updateSortType }) => {
  const onClickHandler = e => (
    updateSortType(e.target.dataset.type)
  );

  return (
    <thead className="CreatureListTableHeader">
      <tr>
        <th><Button variant="outline-success" onClick={onClickHandler} data-type="name">Name</Button></th>
        <th><Button variant="outline-success" onClick={onClickHandler} data-type="type">Type</Button></th>
        <th><Button variant="outline-success" onClick={onClickHandler} data-type="location">Location</Button></th>
        <th><Button variant="outline-success" onClick={onClickHandler} data-type="shadow">Shadow Size</Button></th>
        <th><Button variant="outline-success" onClick={onClickHandler} data-type="time">Time Available</Button></th>
        <th><Button variant="outline-success" onClick={onClickHandler} data-type="price">Price</Button></th>
      </tr>
    </thead>
  );

}

export default CreatureListTableHeader;