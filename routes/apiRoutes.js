const path = require('path');
const router = require('express').Router();
const fs = require('fs');

// GET 
router.get('/notes', (req, res) => {
fs.readFile('./db/db.json', 'UTF-8', (err, data) => {
    if (err) throw err;
    res.send(data)
})
})

// POST
router.post('/notes', (req, res) => {

    let note = req.body;
    note["title"] = req.body.title;
    note["text"] = req.body.text;

    fs.readFile('./db/db.json', 'utf8', (error, file) => {
        if (error) throw error;

        const parsedFile = JSON.parse(file);
        parsedFile.push(note);
        const newStringifiedFile = JSON.stringify(parsedFile);
    
        fs.writeFile('./db/db.json', newStringifiedFile, 'utf8', (err) => {
            if (err) throw err;
            console.log("This new note was added to the database!");
        });

        return res.send(JSON.parse(newStringifiedFile));
    });    
});

// DELETE Notes
// router.delete('/notes/:title', (req, res) => {
    
//     fs.readFile('./db/db.json', 'utf8', (error, file) => {
//         if (error) throw error;

//         let deletedNoteTitle = req.params.title;
//         const parsedFile = JSON.parse(file);
//         const newParsedFile = parsedFile.filter((elem) => elem.title != deletedNoteTitle);
//         const newStringifiedFile = JSON.stringify(newParsedFile);

//         fs.writeFile('./db/db.json', newStringifiedFile, 'utf8', (err) => {
//             if (err) throw err;
//             console.log("This note was deleted!");
//         });
        
//         return res.send(JSON.parse(newStringifiedFile));
//     });
// });



module.exports = router;
