import React from 'react'
import Button from 'react-bootstrap/Button';
import './OptionButton.scss';

const OptionButton = ({ children, ...attributes }) => (
  <Button className="Option-button" {...attributes}>
    {children}
  </Button>
);

export default OptionButton;