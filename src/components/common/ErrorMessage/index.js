import React from "react";

const ErrorMessage = ({ error, messages }) => {
    if (!error) return null;
    return (
      <p className='text-danger mb-3 form_error'>
        {messages[error.type] ? messages[error.type] : ''}
      </p>
    );
  };
  
export default ErrorMessage;