import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../modal/Modal";
const dayjs = require("dayjs");

const EntryRecords = ({
  handleDelete,
  handleInputUpdate,
  modalHandleClick,
  modal,
  updErr,
  updMsgErr,
  handleSubmitUpdate,
  recordId,
  inputName,
  updMsgSuccess,
  updSucces,
}) => {
  const [records, setRecords] = useState([]);
  const [msg, setMsg] = useState();

  const getRecords = async () => {
    const response = await axios("http://localhost:9000/api/records/entry");

    setRecords(response.data.records);
    setMsg(response.data.msg);
  };
  useEffect(() => {
    getRecords();
  }, [records]);

  return (
    <div>
      <p className="h3 mb-4 text-center">Entry Records</p>

      {records ? (
        <table className="table">
          <thead>
            <tr className="text-center">
              <th scope="col">Concept</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          {records.map((record) => {
            return (
              <tbody key={record.id}>
                <tr className="text-center">
                  <td>
                    {record.concept}
                    <i
                      className="text-primary bi bi-pencil-square"
                      onClick={() => modalHandleClick(record.id, "concept")}
                    ></i>{" "}
                  </td>
                  <td>
                    {record.amount}{" "}
                    <i
                      className="text-primary bi bi-pencil-square"
                      onClick={() => modalHandleClick(record.id, "amount")}
                    ></i>{" "}
                  </td>
                  <td>
                    {dayjs(record.date).format("DD/MM/YYYY")}
                    <i
                      className="text-primary bi bi-pencil-square"
                      onClick={() => modalHandleClick(record.id, "date")}
                    ></i>{" "}
                  </td>
                  <td className="text-disabled">{record.type}</td>
                  <td>
                    <i
                      onClick={() => handleDelete(record.id)}
                      className="text-danger bi bi-trash"
                    ></i>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      ) : (
        <p className="h5 text-center alert alert-danger">{msg}</p>
      )}
      {modal === true ? (
        <Modal
          modalHandleClick={modalHandleClick}
          handleInputUpdate={handleInputUpdate}
          updErr={updErr}
          updMsgErr={updMsgErr}
          handleSubmitUpdate={handleSubmitUpdate}
          recordId={recordId}
          inputName={inputName}
          updMsgSuccess={updMsgSuccess}
          updSucces={updSucces}
        />
      ) : null}
    </div>
  );
};

export default EntryRecords;
