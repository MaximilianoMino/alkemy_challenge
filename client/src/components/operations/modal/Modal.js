import React from "react";
import "./modal.scss";
import ModalInput from "./ModalInput";
const Modal = ({
  modalHandleClick,
  handleInputUpdate,
  updErr,
  updMsgErr,
  handleSubmitUpdate,
  recordId,
  inputName,
  updSucces,
  updMsgSuccess,
}) => {
  console.log("recordId: " + recordId);
  return (
    <>
      <div className="_modal">
        <div className="_modal-content">
          <div className="_modal-header">
            <span onClick={modalHandleClick} className="_close">
              ×
            </span>
            <h2 className="modal-title">Modal title</h2>
          </div>
          <hr />
          <div className="_modal-body">
            <form onSubmit={(e) => handleSubmitUpdate(recordId, e)}>
              {inputName === "concept" ? (
                <ModalInput
                  placeholder="Enter concept.."
                  name="concept"
                  id="concept"
                  type="text"
                  htmlFor="concept"
                  labelName="Concept"
                  handleInputUpdate={handleInputUpdate}
                />
              ) : null}
              {inputName === "amount" ? (
                <ModalInput
                  placeholder="Enter the amount.."
                  name="amount"
                  id="amount"
                  type="number"
                  htmlFor="amount"
                  labelName="Amount"
                  handleInputUpdate={handleInputUpdate}
                />
              ) : null}
              {inputName === "date" ? (
                <ModalInput
                  placeholder="Enter a date.."
                  name="date"
                  id="date"
                  type="date"
                  htmlFor="date"
                  labelName="Date"
                  handleInputUpdate={handleInputUpdate}
                />
              ) : null}

              <div className="_modal-footer">
                {updErr ? (
                  <div>
                    <p className="text-danger text-center">{updMsgErr}</p>{" "}
                  </div>
                ) : null}{" "}
                {updSucces ? (
                  <div>
                    <p className="text-success text-center">{updMsgSuccess}</p>{" "}
                  </div>
                ) : null}
                <div className="text-center pt-3">
                  <button type="submit" className="btn btn-success center mb-2">
                    Update record
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
