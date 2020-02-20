const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

try {
    if (fs.accessSync('./db')) {
        console.log('DB 폴더가 이미 존재합니다.');
    }
} catch(err) {
    console.log('DB 폴더가 없어서 새로 생성합니다.');
    fs.mkdirSync('./db');
    //console.log(err);
};

const db = new sqlite3.Database("db/smartfarm.db");

const createDeptSql = `
    CREATE TABLE IF NOT EXISTS dept (
        did INTEGER PRIMARY KEY,
        name TEXT NOT NULL)
`;
const createUserSql = `
    CREATE TABLE user (
        uid TEXT PRIMARY KEY,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        deptId INTEGER NOT NULL,
        tel TEXT,
        regDate DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(deptId) REFERENCES dept(did))
`;
const createActuatorSql = `
    CREATE TABLE actuator (
        aid INTEGER PRIMARY KEY AUTOINCREMENT,
        redLED INTEGER DEFAULT 200,
        greenLED INTEGER DEFAULT 128,
        blueLED INTEGER DEFAULT 80,
        relay INTEGER DEFAULT 0,
        actionTime DATETIME DEFAULT CURRENT_TIMESTAMP,
        reason TEXT,
        uid TEXT NOT NULL,
        FOREIGN KEY(uid) REFERENCES user(uid))
`;
const createSensorSql = `
    CREATE TABLE sensor (
        sid INTEGER PRIMARY KEY AUTOINCREMENT,
        temperature INTEGER DEFAULT 20,
        humidity INTEGER DEFAULT 25,
        cds INTEGER DEFAULT 50,
        distance REAL DEFAULT 10.1,
        sensingTime DATETIME DEFAULT CURRENT_TIMESTAMP,
        uid TEXT NOT NULL,
        FOREIGN KEY(uid) REFERENCES user(uid))
`;
const insertDeptSql = "INSERT INTO dept VALUES(?, ?)";
const insertUserSql = "INSERT INTO user(uid, password, name, deptId, tel) VALUES('admin', '1234', '관리자', 101, '010-2345-6789')";
const selectDeptSql = "SELECT * FROM dept";
const insertActuatorSql = "INSERT INTO actuator(reason, uid) VALUES('Initial value', 'admin')";
const insertSensorSql = "INSERT INTO sensor(uid) VALUES('admin')";
const records = [
    {did: 101, name: '경영지원팀'},
    {did: 102, name: '영업팀'},
    {did: 103, name: '생산팀'},
    {did: 104, name: '연구개발팀'}
];

db.serialize(function() {
    db.run(createDeptSql);
    db.run(createUserSql);
    db.run(createActuatorSql);
    db.run(createSensorSql);

    // Table에 입력하는 순서에 주의
    let stmt = db.prepare(insertDeptSql);
    for (let record of records) {
        stmt.run(record.did, record.name);
    }
    stmt.finalize();
    db.each(selectDeptSql, function(err, row) {
        console.log(row);
    });
    
    db.run(insertUserSql);
    db.run(insertActuatorSql);
    db.run(insertSensorSql);
});

db.close();