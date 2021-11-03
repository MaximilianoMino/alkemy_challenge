import React from "react";

const ModalInput = ({
  handleInputUpdate,
  name,
  placeholder,
  type,
  id,
  htmlFor,
  labelName,
}) => {
  return (
    <>
      <div className="mb-3">
        <label className="form-label" htmlFor={htmlFor}>
          {labelName}
        </label>
        <input
          onChange={handleInputUpdate}
          className="form-control"
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default ModalInput;
