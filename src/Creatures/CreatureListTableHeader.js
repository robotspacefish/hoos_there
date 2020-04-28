import React from 'react';
import Button from 'react-bootstrap/Button';

const CreatureListTableHeader = props => {
  const buttonContent = () => ([
    { content: "Name", type: "name" },
    { content: "Type", type: "type" },
    { content: "Location", type: "location" },
    { content: "Shadow Size", type: "shadow" },
    { content: "Time Available", type: "time" },
    { content: "Price", type: "price" }
  ]);

  const onClickHandler = e => {
    props.updateSort(props.sortInfo, e.target.dataset.type);
  };

  const renderButtons = () => (
    buttonContent().map(btn => (
      <th key={btn.type}>
        <Button variant="outline-success" onClick={onClickHandler} data-type={btn.type}>
          {btn.content} {btn.type === props.sortInfo.type && <i className={props.sortInfo.icon} />}
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