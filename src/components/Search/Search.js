import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Search.scss';

const Search = props => {
  const handleOnChange = e => {
    props.updateQuery(e.target.value)
  };

  const handleOnClick = e => {
    e.preventDefault();
    props.updateQuery('');
  };

  return (
    <div className="Search">
      <div className="Search__container">

        <div className="Search__form">

          <span className="Search__icon">
            <i className="fas fa-search fa-2x"></i>
          </span>
          <Form.Control
            type="text"
            name="query"
            onChange={handleOnChange}
            value={props.query}
          />
        </div>

        <Button variant="outline-danger" onClick={handleOnClick}>
          <i className="fas fa-times"></i>
        </Button>

      </div>

      <p>Search by name, type, location, or price</p>
    </div>
  );
}

export default Search;