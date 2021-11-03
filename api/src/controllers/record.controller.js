const RecordService = require("../services/record.service");
const recordService = new RecordService();

exports.createRecord = async (req, res, next) => {
  const { concept, amount, date, type } = req.body;

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
      msg: "Server error: ",
      error,
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
      msg: "Server error: ",
      error,
    });
  }
};

exports.getLatest = async (req, res, next) => {
  const latestRetrieved = await recordService.getLatest();

  try {
    if (latestRetrieved.length < 1) {
      return res.status(200).json({
        msg: "No records",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Ok",
      records: latestRetrieved,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Server error: ",
      error,
    });
  }
};

exports.getAllRecords = async (req, res, next) => {
  const allRecords = await recordService.getAllRecords();

  try {
    if (allRecords.length < 1) {
      return res.status(200).json({
        msg: "No records",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Ok",
      records: allRecords,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Server error: ",
      error,
    });
  }
};

exports.updateRecord = async (req, res, next) => {
  const { date, concept, amount } = req.body;
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
      msg: "Server error: ",
      error,
    });
  }
};

exports.deleteRecord = async (req, res, next) => {
  const recordDeleted = await recordService.deleteRecord(req.params.id);

  try {
    if (recordDeleted !== req.params.id) {
      res.status(200).json({
        msg: `There is no record with id ${req.params.id}`,
      });
    } else {
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
