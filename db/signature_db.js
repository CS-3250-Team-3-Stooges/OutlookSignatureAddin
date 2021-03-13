/** 
 * Connects to the signature database using the NPM SQLite3 package.
 * https://www.npmjs.com/package/sqlite3
 */

const sqlite3 = require('sqlite3').verbose();
const db_file = 'signature_db.sqlite3'


// Open new connection
let db = new sqlite3.Database(db_file, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Successfully connected to the signature database.');
});

// Create the signature table with 1 column: signature
db.run(
    'create table signatures (signature text);',
    (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Signature table successfully created.');
    });

// Close the database connection
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Successfully closed the database connection.');
});


/**
 * Default module export:
 * This function is called when inserting a new signature into the database.
 */
function insertSignature(sig) {
    db.run(
        `insert into signatures(signature) values(?)`, sig,
        (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Successfully inserted a new signature!');
        });
        closeDB();
}


module.exports = insertSignature;
