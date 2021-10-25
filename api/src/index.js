const app = require("./server");
const { PORT } = require("./config/globals");
const { getConnection } = require("./dao/db/connection");

getConnection()
  .then((message) => {
    console.log(message);

    app.listen(PORT, () =>
      console.log(`Example app listening on port ${PORT}!`)
    );
  })
  .catch(console.log());
