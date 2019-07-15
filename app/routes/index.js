const postRouters = require("./post_routes");

module.exports = function (app, db) {
    postRouters(app, db);
};