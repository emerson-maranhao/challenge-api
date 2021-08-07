const express = require ("express");
const router = express.Router();// importa controlador 'apiController.js' da pasta: 
// ‘../controllers/apiController’
const apiController = require("../controllers/apiController");
// url do teste será: http://localhost:5000/api/teste


router.get("/title",apiController.getMoviesByTitle);

router.get("/genres",apiController.getGenres);

router.get("/year",apiController.getMoviesByYearByGenres);

router.get("/rating",apiController.getMoviesByRating);

router.get("/recents",apiController.getMoviesRecents);



module.exports = router;