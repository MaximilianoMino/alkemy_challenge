import React, { useState } from "react";
import EgressRecords from "./records/EgressRecords";
import EntryRecords from "./records/EntryRecords";
import Form from "./form/Form";
import axios from "axios";

const initialUpdateValues = {
  concept: null,
  amount: null,
  date: null,
};
const Operations = () => {
  const [valuesToUpdate, setValuesToUpdate] = useState(initialUpdateValues);
  const [modal, setModal] = useState(false);
  const [updErr, setUpdErr] = useState(false);
  const [updSucces, setUpdSucces] = useState(false);
  const [updMsgSuccess, setUpdMsgSuccess] = useState();
  const [updMsgErr, setUpdMsgErr] = useState();
  const [recordId, setrecordId] = useState();
  const [inputName, setinputName] = useState();

  //HANDLE VALUES TO DELETE

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this record?."
    );

    if (confirm) {
      try {
        const response = await axios({
          url: `http://localhost:9000/api/records/delete/${id}`,
          method: "delete",
        });
        console.log(response);

        return response;
      } catch (error) {
        console.log(error);
      }
    }
  };

  //HANDLE VALUES FROM UPDATE MODAL

  const handleInputUpdate = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    const changedFormValues = {
      ...valuesToUpdate,
      [name]: value,
    };

    setValuesToUpdate(changedFormValues);
  };

  //HABDLE SUBMIT UPDATE VALUES

  const handleSubmitUpdate = async (id, e) => {
    e.preventDefault();
    console.log(e);

    const { concept, amount, date } = valuesToUpdate;

    //UPDATE CONCEPT
    if (concept) {
      const response = await axios({
        url: `http://localhost:9000/api/records/update/${id}`,
        method: "patch",
        data: { concept: concept },
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });
      setUpdSucces(true);
      setUpdMsgSuccess(response.data.msg);

      setTimeout(() => {
        setUpdSucces(false);
      }, 2000);
      setUpdErr(false);
      return response;
    }

    //UPDATE AMOUNT
    if (amount) {
      const response = await axios({
        url: `http://localhost:9000/api/records/update/${id}`,
        method: "patch",
        data: { amount: amount },
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });
      setUpdSucces(true);
      setUpdMsgSuccess(response.data.msg);

      setTimeout(() => {
        setUpdSucces(false);
      }, 2000);
      setUpdErr(false);
      return response;
    }

    //UPDATE DATE
    if (date !== null) {
      const response = await axios({
        url: `http://localhost:9000/api/records/update/${id}`,
        method: "patch",
        data: { date: date },
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });
      console.log("response: " + response);
      setUpdSucces(true);
      setUpdMsgSuccess(response.data.msg);

      setTimeout(() => {
        setUpdSucces(false);
      }, 2000);
      setUpdErr(false);
      return response;
    } else {
      setUpdMsgErr("Cannot send a empty field");
      setUpdSucces(false);

      setUpdErr(true);
      setTimeout(() => {
        setUpdErr(false);
      }, 2000);
    }
  };

  //OPEN AND CLOSE MODAL
  const modalHandleClick = (id, name) => {
    setinputName(name);

    if (!modal) {
      setModal(true);
      setrecordId(id);
    } else {
      setModal(false);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center mt-5 pt5 mb-4">Budget App</h1>

        <div className="mb-5">
          <Form />
        </div>
        <div className="mt-5">
          <EntryRecords
            handleInputUpdate={handleInputUpdate}
            modalHandleClick={modalHandleClick}
            handleDelete={handleDelete}
            modal={modal}
            updErr={updErr}
            updMsgErr={updMsgErr}
            handleSubmitUpdate={handleSubmitUpdate}
            recordId={recordId}
            inputName={inputName}
            updMsgSuccess={updMsgSuccess}
          />
        </div>
        <div className="mt-5">
          <EgressRecords
            handleInputUpdate={handleInputUpdate}
            modalHandleClick={modalHandleClick}
            handleDelete={handleDelete}
            modal={modal}
            updErr={updErr}
            updMsgErr={updMsgErr}
            handleSubmitUpdate={handleSubmitUpdate}
            recordId={recordId}
            inputName={inputName}
            updMsgSuccess={updMsgSuccess}
            updSucces={updSucces}
          />
        </div>
      </div>
    </>
  );
};

export default Operations;
