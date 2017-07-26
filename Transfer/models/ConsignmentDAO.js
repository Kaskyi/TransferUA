var pgp = require('pg-promise')();
var db = pgp("postgres://postgres:zaq12wsx@127.0.0.1:5432/trucking");

var consignment = ['id', 'weight', 'height', 'width', 'long', 'info'].map(pgp.as.name).join();

/**
 * ConsignmentDAO is the class through which database query operations for the table 'consignment' are executing.
 * @constructor
 */
function ConsignmentDAO() {
    /**
 * Insert a new consignment to database
 * @param {array} speed - Array of fields of the new consignment.
 * @param {function} callback - Function will be executed after request from the database.
 */
    this.insertConsignment = function (speed, callback) {
        var cons = [speed.weight, speed.height, speed.width,  speed.long, speed.info];
        db.query("INSERT INTO consignment(weight, height, width, long, info) VALUES($1, $2, $3, $4, $5) RETURNING id;", cons)
    .then(function (data) {
            callback(data[0]);
        })
    .catch(function (error) {
            console.log("ERROR:", error);
            callback(-1);
        });
    };
    
    this.deleteConsignment = function (id, callback) {
    };
    
    /**
 * Return a consignment from database by an id.
 * @param {string} id - The key to which will search the database.
 * @param {function} callback - The function to which will be retuned a response from request.
 */
    this.findConsignmentById = function (id, callback) {    
            
            db.query('SELECT ${columns^} FROM consignment WHERE id =${_id}', {
                columns: person,
                _id: id
            })
    .then(function (data) {
                callback(data[0]);
            })
    .catch(function (error) {
                console.log("ERROR:", error);
                callback(-1);
            });
        };
    this.updateConsignment = function () {
    };
};

module.exports = ConsignmentDAO;