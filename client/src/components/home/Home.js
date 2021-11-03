import React, { useEffect, useState } from "react";
import InfoCard from "./InfoCard";
import "./home.scss";
import RecordList from "./RecordList";
import axios from "axios";

const Home = () => {
  const [latestRecords, setLatestRecords] = useState([]);
  const [entryAmounts, setEntryAmounts] = useState();
  const [egressAmounts, setEgressAmounts] = useState();

  const getAllRecords = async () => {
    const urlEntry = "http://localhost:9000/api/records/entry";
    const urlEgress = "http://localhost:9000/api/records/egress";

    try {
      const entryResponse = await axios(urlEntry);
      const egressResponse = await axios(urlEgress);

      if (egressResponse.data.records) {
        const egressTotal = egressResponse.data.records.map((record) => {
          return record.amount;
        });
        setEgressAmounts(egressTotal);
      }

      if (entryResponse.data.records) {
        const entryTotal = entryResponse.data.records.map((record) => {
          return record.amount;
        });
        setEntryAmounts(entryTotal);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //GETTING LATEST TEN RECORDS
  const getLatest = async () => {
    const url = "http://localhost:9000/api/records/latest";

    try {
      const response = await axios(url);

      setLatestRecords(response.data.records);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLatest();
    getAllRecords();
  }, []);

  return (
    <div className="container col-12">
      <InfoCard entryAmounts={entryAmounts} egressAmounts={egressAmounts} />
      <RecordList latestRecords={latestRecords} />
    </div>
  );
};

export default Home;
