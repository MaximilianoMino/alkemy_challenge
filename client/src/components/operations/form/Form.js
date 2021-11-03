import React, { useState } from "react";
import axios from "axios";

const inputValues = {
  concept: "",
  amount: null,
  date: "",
  type: "",
};

const Form = () => {
  const [formInputValue, setFormInputValue] = useState(inputValues);
  const [errMsg, setErrMsg] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMsg, setsuccessMsg] = useState();

  const handleInputValue = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    const changedFormValues = {
      ...formInputValue,
      [name]: value,
    };

    setFormInputValue(changedFormValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { concept, amount, date, type } = formInputValue;
    if (concept !== "" && amount !== null && date !== "" && type !== "") {
      const response = await axios({
        url: "http://localhost:9000/api/records/create",
        method: "post",
        data: formInputValue,
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });
      setSuccess(true);
      setsuccessMsg(response.data.msg);

      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      setError(false);
      return response;
    } else {
      setErrMsg("All fields are required");
      setSuccess(false);

      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };
  return (
    <div className="container col-9 mt-5">
      <div className="form-group card p-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="concept">
              Concept
            </label>
            <input
              onChange={handleInputValue}
              className="form-control"
              type="text"
              id="concept"
              name="concept"
              placeholder="Enter concept.."
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="amount">
              Amount
            </label>

            <input
              onChange={handleInputValue}
              className="form-control"
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter the amount.."
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="date">
              Date
            </label>

            <input
              onChange={handleInputValue}
              className="form-control"
              type="date"
              id="date"
              name="date"
              placeholder="Enter a date.."
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="type">
              Type
            </label>
            <select
              defaultValue={"DEFAULT"}
              onChange={handleInputValue}
              className="form-control"
              id="type"
              name="type"
            >
              <option value="DEFAULT" disabled>
                Select an option..
              </option>
              <option value="entry">Entry</option>
              <option value="egress">Egress</option>
            </select>
          </div>
          {error ? (
            <div>
              <p className="text-danger text-center">{errMsg}</p>{" "}
            </div>
          ) : null}
          {success ? (
            <div>
              <p className="text-success text-center">{successMsg}</p>{" "}
            </div>
          ) : null}

          <div className="text-center pt-3">
            <button type="submit" className="btn btn-success center">
              Add record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
