const express = require ("express");
const router = express.Router();

const apiController = require("../controllers/apiController");

router.get("/movie/title",apiController.getMoviesByTitle);

router.get("/movie/genres",apiController.getGenres);

router.get("/movie/year/genre",apiController.getMoviesByYearByGenres);

router.get("/movie/rating",apiController.getMoviesByRating);

module.exports = router;