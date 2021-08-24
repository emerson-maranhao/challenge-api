const Movie = require("../models/movie");
const Rating = require("../models/rating");
const MovieDB = require('node-themoviedb');
const dotenv = require("dotenv");

dotenv.config()
const mdb = new MovieDB(process.env.KEY_TMDB);

async function getMoviesFromDB(title, page = 1, limit = 30) {
    const regex_title = new RegExp(title, 'i')
    const pg = page
    const li = limit
    try {
        const movies = await Movie.find({ title: { $regex: regex_title } })
            .skip(parseInt(pg))
            .limit(parseInt(li))
        return movies
    } catch (error) {
        console.log(error)
    }

}
async function getDetailsFromTMDB(tmdbId) {
    console.log(tmdbId)
    try {
        args = { pathParameters: { movie_id: tmdbId } };
        const tmdbDetails = await mdb.movie.getDetails(args)
        return (tmdbDetails.data)
    } catch (error) {
        console.log(`Error to get details from tmdbId ${tmdbId}` + error.message)
    }

}
function aggregateUrlMovie(movies, details) {
    return movies.map((movie, index) => ({
        ...movie._doc,
        image_url: `${details[index] == undefined ? "null" : `${process.env.URL_BASE_TMDB}${details[index].poster_path}`}`,
        backdrop_path: `${details[index] == undefined ? "null" : `${process.env.URL_BASE_TMDB}${details[index].backdrop_path}`}`,
        release_date:`${details[index] == undefined ? "null" : `${details[index].release_date}`}`,
        overview: `${details[index] == undefined ? "null" : `${details[index].overview}`}`,
        vote_average:details[index] == undefined ? "null" : Number(details[index].vote_average.toFixed(1)),
        popularity: details[index] == undefined ? "null" : Number(details[index].popularity.toFixed()),
        original_title: `${details[index] == undefined ? "null" : `${details[index].original_title}`}`
    }))
}
async function getMoviesByYearAndGenreFromDB(year, genre, page = 1, limit = 30) {
    const regex_genre = new RegExp(genre, 'i')
    try {
        if (year == undefined) {
            const movies = await Movie.find({ genres: { $regex: regex_genre } })
                .skip(parseInt(page))
                .limit(parseInt(limit))
                .sort({ year: -1 })
            return movies
        }
        else {
            const movies = await Movie.find({ year: year, genres: { $regex: regex_genre } })
                .skip(parseInt(page))
                .limit(parseInt(limit))
            return movies
        }
    } catch (error) {
        console.log(error.message)
    }
}
async function getMoviesByRatingFromDB(rating, page = 1, limit = 30) {
    try {

        const regex_rating = new RegExp(parseInt(rating), 'i')
        const pg = page
        const li = limit
        const movies = await Rating.aggregate([{
            "$group": {
                _id: "$movieId",
                avg_rating: { $avg: "$rating" },
                //soma: { $sum: 1 }
            },
            // '$facet': {
            //     metadata: [{ $count: "total" }, { $addFields: { page: pg } }],
            //     data: [{ $skip: (pg - 1) * li }, { $li: li * 1 }]
            // }
        }

        ]).skip(parseInt(pg)).limit(parseInt(li))

        return movies
    } catch (error) {
        console.log(SyntaxError)
    }

}

module.exports = {

    async getMoviesByTitle(req, res) {
        try {
            const movies = await getMoviesFromDB(req.query.title, req.query.page, req.query.limit)
            const details = await Promise.all(movies.map(movie => getDetailsFromTMDB(movie.tmdbId)))
            const result = aggregateUrlMovie(movies, details)
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error.message);
        }

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
            { id: 18, name: 'Western' },
            { id: 19, name: 'no genres listed' }
        ]);
        res.json(genres)
    },

    async getMoviesByYearByGenres(req, res) {
        try {
            const movies = await getMoviesByYearAndGenreFromDB(req.query.year, req.query.genres, req.query.page, req.query.limit)
            const details = await Promise.all(movies.map(movie => getDetailsFromTMDB(movie.tmdbId)))
            const result = aggregateUrlMovie(movies, details)
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async getMoviesByRating(req, res) {
        try {
            const rating = getMoviesByRatingFromDB(req.query.rating, req.query.page, req.query.limit)
                .then(rating =>
                    console.log(rating)
                )

            // const details = await Promise.all(rating.map(rating => getImagePathFromTMDB(rating._id)))
            //const result = aggregateUrlMovie(movies, details)
            res.status(200).send(rating);
        } catch (error) {
            console.log(error)
        }
    },
}