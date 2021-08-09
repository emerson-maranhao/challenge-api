const Movie = require("../models/movie");
const Rating = require("../models/rating");


module.exports = {

    //Return movie list by title
    async getMoviesByTitle(req, res) {

        // configure regex to search by title contain query
        // i for case insensitive
        const regex_title = new RegExp(req.query.title, 'i')
        const { page = 1, limit = 30 } = req.query;

        try {
            await Movie.find({
                title: { $regex: regex_title }
            })
                .skip(parseInt(page))
                .limit(parseInt(limit))
                .then(function (movies) {
                    res.status(200).send({ movies, page, limit });
                });

        } catch (err) {
            //response message error
            return res.status(500).send(err);
        }

    },

    //Return genre list to use in dropdown
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

    //Return list movies by year and genres
    async getMoviesByYearByGenres(req, res) {
        const { page = 1, limit = 30 } = req.query;
        const regex_year = new RegExp(parseInt(req.query.year), 'i') // i for case insensitive


        // return response with posts, total pages, and current page
        if (req.query.year === undefined) {
            try {
                const movies = await Movie.find({
                    genres: req.query.genres
                }).skip(parseInt(page))
                    .limit(parseInt(limit)).sort({ year: -1 })
                // return response with posts, total pages, and current page
                res.status(200).send({ movies, page, limit });


            } catch (err) {
                //return error response
                return res.status(500).send(err);
            }
        }
        else {

            try {
                const movies = await Movie.find({
                    title: { $regex: regex_year },
                    genres: req.query.genres
                }).skip(parseInt(page))
                    .limit(parseInt(limit))

                // return response with posts, total pages, and current page
                res.status(200).send({ movies, page, limit });


            } catch (err) {
                //return error response
                return res.status(500).send(err);
            }
        }


    },

    //Return list movies by rating
    async getMoviesByRating(req, res) {

        const { page = 1, limit = 10 } = req.query;
        const regex_rating = new RegExp(parseInt(req.query.rating), 'i') // i for case insensitive
        try {
            const movies = await Rating.aggregate([{
                "$group": {
                    _id: "$movieId",
                    avg_rating: { $avg: "$rating" },
                    soma: { $sum: 1 }
                },
            },
            {
                '$facet': {
                    metadata: [{ $count: "total" }, { $addFields: { page: page } }],
                    data: [{ $skip: (page - 1) * limit }, { $limit: limit * 1 }] // add projection here wish you re-shape the docs
                }
            }
            ])
            // return response with posts, total pages, and current page
            res.json({
                movies
            });
        } catch (err) {
            console.error(err.message);
        }
    },

}










