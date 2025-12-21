const { db } = require('../database');

const all = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if(err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

const get = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if(err) {
                reject(err);
            } else {
                resolve(row);
            }
        })
    })
}

const run = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, function(err) {
            if(err) {
                reject(err);
            } else {
                resolve(this);
            }
        })
    })
}

module.exports = { all, get, run };