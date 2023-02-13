const upload = require('../upload');
const fs = require('fs');
const conn = require('../connect');
const { options } = require('joi');
const Joi = require('joi');
module.exports = function(server) {
    server.post('/api/upload', upload.single('image'), function(req, res) {
        req.body.image = req.file.filename;
        res.send({
            result: req.file.filename,
            status: true
        })
    });
    server.get('/api/new/:id', function(req, res) {
        let sql = 'SELECT * FROM news WHERE id = ?';
        conn.query(sql, [req.params.id], (err, data) => {
            res.send({
                result: data,
                status: true
            });
        })
    });
    server.post('/api/product', function(req, res) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            status: Joi.number().required()
        })
        const { error } = schema.validate(req.body, options);
        if (!error) {
            let sql = 'INSERT INTO comments SET ? ';
            conn.query(sql, [req.body], (err, data) => {
                res.send({
                    result: req.body,
                    status: true
                });
            })
        }
    });
    server.delete('/api/product/:id', function(req, res) {
        let sql = 'DELETE FROM comments WHERE id = ? ';
        conn.query(sql, [req.params.id], (err, data) => {
            res.send({
                categories: null,
                status: true
            })
        })

    })
    server.update('/api/product/:id', function(req, res) {
        let sql = 'UPDATE comments SET ? WHERE id = ?';
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            status: Joi.number().required()
        })
        const { error } = schema.validate(req.body, options);
        if (!error) {
            conn.query(sql, [req.body, req.params.id], (err, data) => {
                res.send({
                    categories: req.body,
                    status: true
                })
            })
        }
    })
}