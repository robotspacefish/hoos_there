import React from 'react';
import Button from 'react-bootstrap/Button';

const CreatureListTableHeader = ({ updateSortType }) => {
  const buttonContent = [
    { content: "Name", type: "name" },
    { content: "Type", type: "type" },
    { content: "Location", type: "location" },
    { content: "Shadow Size", type: "shadow" },
    { content: "Time Available", type: "time" },
    { content: "Price", type: "price" }
  ];

  const onClickHandler = e => (
    updateSortType(e.target.dataset.type)
  );

  const renderButtons = () => (
    buttonContent.map(btn => (
      <th key={btn.type}>
        <Button variant="outline-success" onClick={onClickHandler} data-type={btn.type}>
          {btn.content}
        </Button>
      </th>
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