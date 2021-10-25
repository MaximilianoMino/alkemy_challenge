const express = require("express");
const recordRouter = express.Router();
const recordController = require("../controllers/record.controller");

recordRouter.post("/api/records/create", recordController.createRecord);
recordRouter.get("/api/records/entry", recordController.getEntryRecords);
recordRouter.get("/api/records/egress", recordController.getEgressRecords);
recordRouter.patch("/api/records/update/:id", recordController.updateRecord);
recordRouter.delete("/api/records/delete/:id", recordController.deleteRecord);

module.exports = recordRouter;
