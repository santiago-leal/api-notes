const { connect } = require("mongoose");

(async () => {
  try {
    db = await connect(process.env.DB_MONGO_URI);
    console.log("DB connected to", db.connection.name);
  } catch (e) {
    console.error(e);
  }
})();
