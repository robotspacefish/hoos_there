import React from 'react';

const Button = ({ className, clickHandler, content, dataType }) => (
  <button
    className={className}
    onClick={clickHandler}
    data-type={dataType}
  >
    {content}
  </button>
);

export default Button;