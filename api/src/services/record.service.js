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

  async getAllRecords() {
    const allRecords = await Record.findAll();
    return allRecords;
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
  async getLatest() {
    const latest = await Record.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
    });
    return latest;
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
