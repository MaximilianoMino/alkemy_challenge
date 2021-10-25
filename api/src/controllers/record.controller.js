const RecordService = require("../services/record.service");
const recordService = new RecordService();
const UserService = require("../services/user.service");

const userService = new UserService();

exports.createRecord = async (req, res, next) => {
  const { concept, amount, date, type } = req.body;

  console.log(req.body);

  const _amount = parseInt(amount);

  try {
    const recordCreated = await recordService.createRecord(
      concept,
      _amount,
      date,
      type
    );

    res.status(200).json({
      success: true,
      msg: "Record created",
      record: recordCreated,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};

exports.getEntryRecords = async (req, res, next) => {
  const recordsRetrieved = await recordService.getEntryRecords();

  try {
    if (recordsRetrieved.length < 1) {
      return res.status(200).json({
        msg: "No records",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Ok",
      records: recordsRetrieved,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Cannot retrieve records",
      error: error,
    });
  }
};

exports.getEgressRecords = async (req, res, next) => {
  const recordsRetrieved = await recordService.getEgressRecords();

  try {
    if (recordsRetrieved.length < 1) {
      return res.status(200).json({
        msg: "No records",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Ok",
      records: recordsRetrieved,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Cannot retrieve records",
      error: error,
    });
  }
};

exports.updateRecord = async (req, res, next) => {
  const { date, concept, amount } = req.body;
  console.log(req.body);
  const recordUpdate = await recordService.updateRecord(
    req.params.id,
    date,
    concept,
    amount
  );

  const recordRetrieved = await recordService.getRecordById(req.params.id);

  try {
    if (!recordRetrieved) {
      return res.status(400).json({
        msg: `There is no record with id ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      msg: "Record Updated",
      record: recordUpdate,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Cannot update record",
      error: error,
    });
  }
};

exports.deleteRecord = async (req, res, next) => {
  const recordDeleted = await recordService.deleteRecord(req.params.id);

  console.log("user: " + user);

  try {
    if (recordDeleted !== req.params.id) {
      console.log("record: " + recordDeleted);

      res.status(200).json({
        msg: `There is no record with id ${req.params.id}`,
      });
    } else {
      console.log("recordE: " + recordDeleted);

      res.status(200).json({
        success: true,
        msg: "Record deleted with success",
        recordDeleted: recordDeleted,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: error,
    });
  }
};
