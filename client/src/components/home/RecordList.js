import React from "react";
import dayjs from "dayjs";

const RecordList = ({ latestRecords }) => {
  return (
    <>
      <div className=" d-flex flex-column">
        <h2 className="py-3 text-center font-bold font-up">
          Latest transactions.
        </h2>
        {latestRecords ? (
          <table className="table">
            <thead>
              <tr>
                <th>Concept</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {latestRecords.map((record) => {
                return (
                  <tr>
                    <td>{record.concept}</td>
                    <td>{record.amount}</td>
                    <td> {dayjs(record.date).format("DD/MM/YYYY")}</td>
                    <td>{record.type}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="h5 text-center alert alert-danger">No records</p>
        )}
      </div>
    </>
  );
};

export default RecordList;
