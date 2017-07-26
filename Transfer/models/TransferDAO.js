var pgp = require('pg-promise')();
var db = pgp("postgres://postgres:zaq12wsx@127.0.0.1:5432/trucking");

const STATUS = {
    WAITING_TO_ORDER: 1,
    TRANSPORTING: 2,
    EXECUTED: 3,
}

var transfer = ['start_place', 'end_place', 'start_time', 'end_time', 'id_consignment', 'id_car', 'id_driver', 'status','info'].map(pgp.as.name).join();

/**
 * TransferDAO is the class through which database query operations for the table 'transfer' are executing.
 * @constructor
 */
function TransferDAO() {
    /**
 * Return a transfer from database by an id.
 * @param {string} id - The key to which will search the database.
 * @param {function} callback - The function to which will be retuned a response from request.
 */
    this.findTransfersByCustomerId = function (id, callback) {
        db.query('SELECT ${columns^} FROM transfer LEFT JOIN consignment ON transfer.id_consignment = consignment.id WHERE id_customer = ${id_customer}', {
            columns: transfer,
            id_customer: id
        })
    .then(function (data) {
            callback(data);
        })
    .catch(function (error) {
            console.log("ERROR:", error);
            callback(-1);
        });
    };
    /**
 * Insert a new transfer to database
 * @param {array} speed - Array of fields of the new transfer.
 * @param {function} callback - Function will be executed after request from the database.
 */ 
    this.insertTransfer = function (speed, callback) {
        var cons = [speed.start_place, speed.end_place, speed.start_time, speed.end_time, speed.consignmentId, speed.customerId, 1];
        db.query("INSERT INTO  transfer(start_place, end_place, start_time, end_time, id_consignment, id_customer, status) VALUES($1, $2, $3, $4, $5, $6, $7);", cons)
    .then(function (data) {
            callback(data);
        })
    .catch(function (error) {
            console.log("ERROR:", error);
            callback(-1);
        });
    };
    
    this.deleteTransfer = function () {
    };
    this.findTransfer = function () {
    };
    this.updateTransfer = function () {
    };

};
module.exports = TransferDAO;
/*
 * 
 * 
INSERT INTO transfer 
(start_place, end_place, start_time, end_time, id_consignment, id_car, id_driver, status) 
VALUES
('', '', '', '',1,2,,0 );
 * 
 * 
 INSERT INTO transfer 
(start_place, end_place, start_time, end_time, id_consignment, id_car, id_driver, status) 
VALUES
('вулиця Льва Толстого, 11/61, Київ', 'вулиця Харківська, 4, Суми, Сумська область', '2016-9-18 04:05:06', '2016-9-30 05:00:00',1,2,,0 );
 */