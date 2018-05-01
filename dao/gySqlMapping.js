// dao/userSqlMapping.js
// CRUD SQL语句
var bo = {
    userQuery:'SELECT * FROM user_table',
    userCreate:'INSERT INTO user_table(username, password) VALUES(?,?)',
    userDestroy:'DELETE FROM user_table WHERE id=?',
    userUpdate:'UPDATE user_table SET username=?, password=? WHERE id=?',
    home:'SELECT * FROM user_table WHERE username=? AND password=?',
    contactQuery:'SELECT * FROM contact_table ORDER BY id DESC',
    contactCreate:'INSERT INTO contact_table(name, email, requires, phone, time, complete) VALUES(?,?,?,?,?,?)',
    contactDestroy:'DELETE FROM contact_table WHERE id=?',
    contactUpdate:'UPDATE contact_table SET name=?, email=?, requires=?, phone=?, time=?, complete=? WHERE id=?',
    vedioQuery:'SELECT * FROM vedio_table',
    vedioCreate:'INSERT INTO vedio_table(title, imgsrc, vediosrc) VALUES(?,?,?)',
    vedioDestroy:'DELETE FROM vedio_table WHERE id=?',
    vedioUpdate:'UPDATE vedio_table SET title=?, imgsrc=?, vediosrc=? WHERE id=?',
};

module.exports = bo;