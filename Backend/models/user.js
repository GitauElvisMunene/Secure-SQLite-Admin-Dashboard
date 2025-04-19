const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database("../mock.db")


class User {
    static create(userData, callback){
        const sql = `INSERT INTO Users (username, email, password, id) VALUE(?,?,?,?)`;
        db.run(sql,[userData.username, userData.email, userData.password, userData.id], callback);
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