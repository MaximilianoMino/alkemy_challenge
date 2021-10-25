const Record = require("../dao/models/records");

module.exports = class {
  async createRecord(concept, amount, date, type) {
    await Record.create({
      concept: concept,
      amount: amount,
      date: date,
      type: type,
    });
  }

  async getEntryRecords() {
    const entryRecords = await Record.findAll({
      where: {
        type: "entry",
      },
    });

    return entryRecords;
  }
  async getEgressRecords() {
    const egressRecords = await Record.findAll({
      where: {
        type: "egress",
      },
    });

    return egressRecords;
  }

  async getRecordById(id) {
    const record = await Record.findByPk(id);

    return record;
  }

  async updateRecord(id, date, concept, amount) {
    const record = await Record.update(
      { date: date, concept: concept, amount: amount },
      { where: { id: id } }
    );
    console.log(record);
    return record;
  }

  async deleteRecord(id) {
    const recordToDelete = await Record.destroy({
      where: {
        id: id,
      },
    });
    return recordToDelete;
  }
};
