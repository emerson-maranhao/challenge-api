const express = require ("express");
const router = express.Router();
// ‘../controllers/apiController’
const apiController = require("../controllers/apiController");


router.get("/movie",apiController.getMoviesByTitle);

router.get("/movie/genres",apiController.getGenres);

router.get("/movie",apiController.getMoviesByYearByGenres);

router.get("/movie",apiController.getMoviesByRating);

router.get("/movie",apiController.getMoviesRecents);



module.exports = router;