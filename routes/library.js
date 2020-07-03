var express = require('express');
var router  = express.Router();
const { body, validationResult } = require('express-validator');
const e = require('express');
const url = 'localhost:27017/MuS';
const db = require ('monk')(url);

// Check if the database correctly connect or not.
db.then(() => 
{
    console.log('Connected correctly to server')
})

/* GET users listing. */
router.get('/', function(req, res, next) 
{
    res.render('library')
});

/* GET users listing. */ 
// addsong is just a pathname, we can set it to other name.
router.get('/addsong', function(req, res, next) 
{
    // add_song is a file name.
    res.render('add_song')
});

router.post('/addsong',[
    // If forms is empty, it would check and send back the sentences.
    body('inputName'    , "Please input name of the song.").notEmpty(),
    body('inputArtist'  , "Please input name of artist(s).").notEmpty(),
    body('inputAlbum'   , "Please input name of the album.").notEmpty(),
    body('inputWriter'  , "Please input name of writer(s).").notEmpty(),
    body('inputProducer', "Please input name of producer(s).").notEmpty(),
    body('inputGenre'   , "Please input genre(s).").notEmpty(),
    body('inputLyrics'  , "Please input the lyrics.").notEmpty()
], function(req, res, next) 
{
    const result = validationResult(req)
    const err_container = result.errors
    // If errors isn't empty or null, it will log what inside errors as an arrays.
    if(!result.isEmpty())
    {
        // It will render @add_song.ejs and send the $lib_error which contained data from $err_container.
        res.render('add_song', {lib_error: err_container})
    }
    else
    {
        // $cln stands for Collection.
        const cln = db.get('song_library')
    
        cln.insert([{
            // Creating variable names and setting datas to variables.
            song_name   : req.body.inputName ,
            artist      : req.body.inputArtist,
            album       : req.body.inputAlbum,
            writer      : req.body.inputWriter,
            producer    : req.body.inputProducer,
            genre       : req.body.inputGenre,
            lyrics      : req.body.inputLyrics
        // $docs is equal to datas from insertion.
        }]).then(added => 
            {
                console.log('Added data succesfully!', added)
                setTimeout(() => {
                    req.flash("success", "Song has been added successfully.");
                    res.redirect('/library/addsong')
                }, 2000);
            }).catch(err => {
                console.log('This is error =', err)
        })
    }
    // console.log(req.body.inputName)
    // console.log(req.body.inputArtist)
    // console.log(req.body.inputAlbum)
    // console.log(req.body.inputWriter)
    // console.log(req.body.inputProducer)
    // console.log(req.body.inputGenre)
    // console.log(req.body.inputLyrics)
});

module.exports = router;