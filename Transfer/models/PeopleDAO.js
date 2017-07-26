var pgp = require('pg-promise')();
var db = pgp("postgres://postgres:zaq12wsx@127.0.0.1:5432/trucking");

const PeopleType = {
    CLIENT: 1,
    DRIVER: 2,
    LOGIST: 3,
}

var person = ['id', 'name', 'email', 'password', 'contact', 'type', 'salary','token','series'].map(pgp.as.name).join();

/**
 * PeopleDAO is the class through which database query operations for table 'people' are executing.
 * @constructor
 */
function PeopleDAO() {
    /**
 * Insert a new person to database
 * @param {array} speed - Array of fields of the new person.
 * @param {function} callback - Function will be executed after request from the database.
 */
    this.insertPeople = function (speed, callback) {
        var cons = [speed.username, speed.email, speed.password, speed.mobile_phone, 1];
        console.log(cons);
        db.query("INSERT INTO people(name, email,password,contact,type) VALUES($1, $2, $3, $4, $5) RETURNING id", cons)
    .then(function (id) {
            callback(id[0]);
        })
    .catch(function (error) {
            console.log("ERROR:", error);
            callback(-1);
        });
    };
    /**
 * Delete a person from database
 * @param {integer} id - Person's id.
 */
    this.deletePeople = function () {
    };
    /**
 * Return a person from database by an email.
 * @param {string} email - The key to which will search the database.
 * @param {function} callback - The function to which will be retuned a response from request.
 */ 
    this.findAManByEmail = function (email, callback) {
        
        db.query('SELECT ${columns^} FROM ${table~} WHERE email =${_email}', {
            columns: person,
            table: 'people',
            _email: email
        })
    .then(function (data) {
            callback(data[0]);
        })
    .catch(function (error) {
            console.log("ERROR:", error);
            callback(-1);
        });
    };
    /**
 * Return a person from database by an id.
 * @param {integer} id - The key to which will search the database.
 * @param {function} callback - The function to which will be retuned a response from request.
 */ 
    this.findAManByID = function (id, callback) {
        
        db.query('SELECT ${columns^} FROM ${table~} WHERE id =${_id}', {
            columns: person,
            table: 'people',
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
    /**
 * Return all people from database.
 */ 
    this.getAllPeople = function () {     
        db.query('SELECT ${columns^} FROM ${table~}', {
            columns: person,
            table: 'people'
        })
    .then(function (data) {
            console.log("DATA:", data);
        })
    .catch(function (error) {
            console.log("ERROR:", error);
        });
    };
    /**
 * Update the person's information .
 * @param {array} Upperson - The new peson's information.
 * @param {function} callback - The function to which will be retuned a response from request.
 */
    this.updatePersonByID = function (Upperson, callback) {

        var query = 'UPDATE people SET';

        person.forEach(function (vr) {
            if (Upperson['vr'] != 'underfined') {
                query += 'SET ' + vr + '= \'' + Upperson['vr'] + '\',';
            }

        });
        
        query = query.slice(0, -1);// for ','
        query += ' WHERE id =' + person.id + ';';
        db.query(query)
    .then(function (data) {
            callback(data);
        })
    .catch(function (error) {
            console.log("ERROR:", error);
            callback(-1);
        });
    };
};
module.exports = PeopleDAO;
/*
 * 
 * 
 * 
 * var columns = ['id', 'name'];
        db.query('SELECT ${columns^} FROM ${table~} ', {
            columns: columns.map(pgp.as.name).join(),
            table: 'people',
            _email: email
        })
    .then(function (data) {
            callback(data[0]);
        })
    .catch(function (error) {
            console.log("ERROR:", error);
            callback(-1);
        });
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
1 - 
2 - driver
3 - logist
 * 
 * 
 * Change column type 
ALTER TABLE car
MODIFY COLUMN name character(255);
 * 
 * 
 * Selecet all
SElect * from transfer;
 * 
 * 
 * Update person info
UPDATE people
SET name='Cuc Watkins',email='FraeadTT@gmail.com',password='xxxzzz',contact='065-456-34-26',type=2
WHERE id=7;
 * 
 * 
 * add new person
INSERT INTO people (name,email,password,contact,type)
VALUES ('Concetta Dicarlo','logist@gmail.com','12345','078-765-93-01',3);
 * 
 * 
 * rename column
/*ALTER TABLE people RENAME COLUMN car_model TO type;
 * 
 * 
 * 
/*ALTER TABLE car
ALTER  COLUMN car_model varchar(255);
 * 
 * 
 * 
/*ALTER TABLE car
ADD car_model varchar(255);
 * 
 * 
 * 
/*UPDATE car
SET car_model='КамАЗ 55102 1991',capacity=400,license_plate='AC5764MB'
WHERE id=2;
 * 
 * 
 * 
/*ALTER TABLE car add license_plate varchar(8);
 * 
 * 
 * 
/*INSERT INTO car (consumption,capacity,maintenance_costs,car_model,license_plate)
VALUES (2000,7000,1000,'МАЗ 5334 1985','BC5478EE');
 * 
 * 
 * 
/*INSERT INTO consignment (weight,height,width,long,info)
VALUES (500,300,200,200,'Children''s Games')
 * 
 * 
 * 

/*INSERT INTO transfer (start_place,end_place,start_time,end_time,id_consignment,id_car,id_driver)
VALUES (Point(47.65100, -122.34900, 4326),Point(46.65100, -121.34900, 4326),'2009-06-04 22:00:00','2009-06-12 22:00:00',1,2,8)
 * 
 */
