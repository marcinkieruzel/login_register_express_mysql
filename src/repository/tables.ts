var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'express',
});

const create_table_users = () => {
    pool.getConnection((error: Error, connection: any) => {
        connection.query(
            'CREATE TABLE IF NOT EXISTS users (id int NOT NULL AUTO_INCREMENT, username varchar(255), password varchar(255), PRIMARY KEY (id));',
            function (error: Error) {
                if (error) throw error;
                console.log('Done');
            }
        );
    });
};

export { create_table_users };
