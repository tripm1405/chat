import React, { forwardRef } from 'react';

function Input(props, ref) {
  return (
    <input 
      type={props.type || 'text'} 
      className={props.className}
      placeholder={props.placeholder} 
      ref={ref} />
  );
}

export default forwardRef(Input);