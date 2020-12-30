import React from "react";

const Input = ({ name, label, error, placeholder, ...rest }) => {
  return (
    <div className="form-group p-2">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control p-2" placeholder={placeholder}/>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
