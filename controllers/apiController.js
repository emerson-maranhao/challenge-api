const Movie = require("../models/movie");
const Rating = require("../models/rating");
const MovieDB = require('node-themoviedb');
const dotenv = require("dotenv");

dotenv.config()

async function getMoviesFromDB(title, page = 1, limit = 30) {
    const regex_title = new RegExp(title, 'i')
    const pg = page
    const li = limit
    const movies = await Movie.find({ title: { $regex: regex_title } })
        .skip(parseInt(pg)).limit(parseInt(li))
    return movies
}
async function getImagePathFromTMDB(movie_id) {
    const mdb = new MovieDB(process.env.KEY_TMDB);
    if (movie_id == undefined) { return }
    args = { pathParameters: { movie_id: movie_id } };
    const tmdbDetails = await mdb.movie.getDetails(args)
    return (tmdbDetails.data)
}
async function getMoviesByRatingFromDB(rating, page = 1, limit = 30) {

    const regex_rating = new RegExp(parseInt(rating), 'i')
    const pg = page
    const li = limit
    const movies = await Rating.aggregate([{
        "$group": {
            _id: "$movieId",
            avg_rating: { $avg: "$rating" },
            soma: { $sum: 1 }
        },
            '$facet': {
                metadata: [{ $count: "total" }, { $addFields: { page: pg } }],
                data: [{ $skip: (pg - 1) * li }, { $li: li * 1 }]
            }
         }
    
    ])

    return movies

}
function aggregateUrlMovie(movies, details) {
    console.log(details)
    return movies.map((movie, index) => ({
        ...movie._doc,
        image_url: `${details[index] == undefined ? "null" : `${process.env.URL_BASE_TMDB}${details[index].poster_path}`}`,
        overview:`${details[index] == undefined ? "null" : `${details[index].overview}`}`,
        popularity:`${details[index] == undefined ? "null" : `${details[index].popularity}`}`,
        original_title:`${details[index] == undefined ? "null" : `${details[index].original_title}`}`
    }))
}
async function getMoviesByYearAndGenreFromDB(year, genre, page = 1, limit = 30) {
    const regex_year = new RegExp(parseInt(year), 'i')
    if (year === undefined) {
        const movies = await Movie.find({
            genres: genre
        }).skip(parseInt(page)).limit(parseInt(limit)).sort({ year: -1 })
        return movies
    }
    else {
        const movies = await Movie.find({
            title: { $regex: regex_year },
            genres: genre
        }).skip(parseInt(page)).limit(parseInt(limit))
        return movies
    }

}

module.exports = {

    async getMoviesByTitle(req, res) {
        const movies = await getMoviesFromDB(req.query.title, req.query.page, req.query.limit)
        const details = await Promise.all(movies.map(movie => getImagePathFromTMDB(movie.tmdbId)))
        const result = aggregateUrlMovie(movies, details)
        res.status(200).send(result);
    },

    async getGenres(req, res) {
        var genres = ([
            { id: 1, name: 'Action' },
            { id: 2, name: 'Adventure' },
            { id: 3, name: 'Animation' },
            { id: 4, name: 'Children' },
            { id: 5, name: 'Comedy' },
            { id: 6, name: 'Crime' },
            { id: 7, name: 'Documentary' },
            { id: 8, name: 'Drama' },
            { id: 9, name: 'Fantasy' },
            { id: 10, name: 'Film-Noir' },
            { id: 11, name: 'Horror' },
            { id: 12, name: 'Musical' },
            { id: 13, name: 'Mystery' },
            { id: 14, name: 'Romance' },
            { id: 15, name: 'Sci-Fi' },
            { id: 16, name: 'Thriller' },
            { id: 17, name: 'War' },
            { id: 18, name: 'Western' }
        ]);
        res.json(genres)


    },

    async getMoviesByYearByGenres(req, res) {
        const movies = await getMoviesByYearAndGenreFromDB(req.query.year, req.query.genres, req.query.page, req.query.limit)
        const details = await Promise.all(movies.map(movie => getImagePathFromTMDB(movie.tmdbId)))
        const result = aggregateUrlMovie(movies, details)
        res.status(200).send(result);

    },

    async getMoviesByRating(req, res) {
        const movies = getMoviesByRatingFromDB(req.query.rating, req.query.page, req.query.limit)
        .then(rating=>
            console.log(rating)
        )
        // const details = await Promise.all(movies.map(movie => getImagePathFromTMDB(movie.tmdbId)))
        // const result = aggregateUrlMovie(movies, details)
        // res.status(200).send(result);
    },
}