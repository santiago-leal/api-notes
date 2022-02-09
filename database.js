const { connect } = require('mongoose');

(async () => {
    try {
        db = await connect("mongodb://localhost/ascensor")
        console.log("DB connected to", db.connection.name)
    } catch (e) {
        console.error(e);
    }
})();