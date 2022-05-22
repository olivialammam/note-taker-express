const path = require('path');
const router = require('express').Router();
const fs = require('fs');

router.get('/notes', (req, res) => {
fs.readFile('./db/db.json', 'UTF-8', (err, data) => {
    if (err) throw err;
    res.send(data)
})
})

module.exports = router;