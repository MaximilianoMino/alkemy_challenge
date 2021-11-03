import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const InfoCard = ({ entryAmounts, egressAmounts }) => {
  const [balance, setBalance] = useState(0);
  const [egressTotal, setEgressTotal] = useState(0);
  const [entryTotal, setEntryTotal] = useState(0);
  console.log(egressAmounts);

  const getBalance = useCallback(async () => {
    if (entryAmounts) {
      const entry = await entryAmounts.reduce((a, b) => {
        return a + b;
      });
      setEntryTotal(entry);
    }

    if (egressAmounts) {
      const egress = await egressAmounts.reduce((a, b) => {
        return a + b;
      });
      setEgressTotal(egress);
    }

    setBalance(entryTotal - egressTotal);
  }, [entryAmounts, egressAmounts, entryTotal, egressTotal]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <div className="pt-5 mb-5 mt-5">
      <div className="card w-75 p-3 m-auto text-center">
        <div className="card-body">
          <div className="card-title">
            {balance < 0 ? (
              <h3 className="text-danger">${balance}</h3>
            ) : (
              <h3 className="text-success">${balance}</h3>
            )}
            {egressTotal > 0 && entryTotal < 0 && (
              <h3 className="text-danger">${balance}</h3>
            )}
            {entryTotal > 0 && egressTotal < 0 && (
              <h3 className="text-success">${balance}</h3>
            )}
          </div>
          <div className="card-text">
            <span>CURRENT BALANCE</span>
          </div>
          <div className="">
            <Link className="btn btn-success mt-2" to="/operations">
              See transactions..
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
