const express = require ("express");
const router = express.Router();// importa controlador 'apiController.js' da pasta: 
// ‘../controllers/apiController’
const apiController = require("../controllers/apiController");
// url do teste será: http://localhost:5000/api/teste

// TODO: listar pontos de interesse da BD
//router.get("/details",apiController.details);
//router.get("/all",apiController.listAllMovies);


router.get("/title",apiController.getMoviesByTitle);

router.get("/genres",apiController.getGenres);

router.get("/year",apiController.getMoviesByYearByGenres);

router.get("/rating",apiController.getMoviesByRating);


module.exports = router;