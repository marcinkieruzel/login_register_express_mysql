import { createPool, FieldInfo, MysqlError } from 'mysql';
const util = require('util');
import * as crypto from 'crypto';
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'express',
});

const verify_password = (username: string, password: string) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((error: Error, connection: any) => {
            var sql = 'SELECT * FROM ?? WHERE ?? = ?';
            var credentials = ['users', 'username', username, password];
            sql = mysql.format(sql, credentials);

            connection.query(sql, function (error: Error, results: Array<{ [key: string]: any }>, fields: FieldInfo) {
                if (error) throw error;
                console.log(results, fields, results[0].password);

                const hash = crypto.createHash('sha256').update(password).digest('hex');

                if (hash === results[0].password) {
                    console.warn('Valid', hash, results[0].password);
                    resolve(true);
                } else {
                    console.log('Not valid', hash, results[0].password);
                    reject(false);
                }
            });
        });
    });
};

const insert_user = (username: string, password: string) => {
    pool.getConnection((error: Error, connection: any) => {
        var sql = 'INSERT INTO ?? (??, ??) VALUES (?,?)';
        var inserts = ['users', 'username', 'password', username, password];
        sql = mysql.format(sql, inserts);

        connection.query(sql, function (error: Error) {
            if (error) throw error;
            console.log('Done');
        });
    });
};

export { insert_user, verify_password };
