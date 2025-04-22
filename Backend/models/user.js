const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const db = new sqlite3.Database(path.join(__dirname, '../mock.db'))


class User {
    static create(userData, callback){
        const sql = `INSERT INTO Users (username, email, password) VALUES(?,?,?)`;
        db.run(sql,[userData.username, userData.email, userData.password], function(err) {
            if (err) {
                console.error('Database error:', err);
                return callback(err);
            }
            callback(null);
        });
    }

   //Find User by userName
    static findByUsername (username, callback) {
        const sql = `SELECT * FROM Users WHERE username=?`;
        db.get(sql, [username], callback);

}

    //check if a user exists (for login)
    static authenticate(username, password, callback){
        const sql = `SELECT * FROM Users WHERE username = ? AND password = ?`;
        db.get(sql, [username, password], callback);
    }

}

module.exports = User;