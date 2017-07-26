var pgp = require('pg-promise')();
var PeopleDAO = require('./PeopleDAO.js');
var ConsignmentDAO = require('./ConsignmentDAO.js');
var TransferDAO = require('./TransferDAO.js');


/**
 * DAOFactory is the class through which server request coonect to the database. 
 * @constructor
 */
function DAOFactory()
{
    this._db = pgp("postgres://postgres:zaq12wsx@127.0.0.1:5432/trucking");
    console.log("DAOFactory database loaded");
    var _connstring = 
        "host=127.0.0.1;" +
            "Port=5432;" +
            "User Id=postgres;" +
            "Password=zaq12wsx;" +
            "Database =trucking;"; 
    
            /** PeopleDAO method returns an instance of the PeopleDAO class  */
    this.PeopleDAO = function () {
        return new PeopleDAO();
    };
    
    /** ConsignmentDAO method returns an instance of the ConsignmentDAO class  */
    this.ConsignmentDAO = function () {
        return new ConsignmentDAO();
    };
    
    /** TransferDAO method returns an instance of the TransferDAO class  */
    this.TransferDAO = function () {
        return new TransferDAO();
    };
};

DAOFactory.prototype.createConnection = function () {
    if (!this._db) {
        this._db = pgp("postgres://postgres:zaq12wsx@127.0.0.1:5432/trucking");
    }
    return this._db;
};
module.exports = new DAOFactory();