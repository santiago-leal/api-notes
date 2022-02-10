const { connect } = require('mongoose');

(async () => {
    try {
        db = await connect(process.env.DB_NAME)
        console.log("DB connected to", db.connection.name)
    } catch (e) {
        console.error(e);
    }
})();