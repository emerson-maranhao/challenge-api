const Movie = require("../models/movie");
const Rating = require("../models/rating");
const Teste = require("../models/teste");
const Link = require("../models/links");
const MovieDB = require('node-themoviedb');

const mdb = new MovieDB("c8743cbcc56f2bdad7006da6638f6bea");

module.exports = {

    //Return movie list by title
    async getMoviesByTitle(req, res) {

        // configure regex to search by title contain query
        // i for case insensitive
        const regex_title = new RegExp(req.query.title, 'i')
        const { page = 1, limit = 10 } = req.query;

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
        const { page = 1, limit = 10 } = req.query;
        const regex_year = new RegExp(parseInt(req.query.year), 'i')
        // i for case insensitive
        try {
            await Movie.find({
                title: { $regex: regex_year },
                genres: req.query.genres
            })
                .skip(parseInt(page))
                .limit(parseInt(limit))
                .then(function (movies) {
                    movies.forEach(function (movie) {

                        movie.url_name = 'any string';
                        console.log(movie.url_name);
                    })
                    // return response with posts, total pages, and current page
                    res.status(200).send({ movies, page, limit });
                });

        } catch (err) {
            //return error response
            return res.status(500).send(err);
        }
    },

    async getMoviesRecents(req, res) {
        const { page = 1, limit = 10 } = req.query;
        var year = new Date().getFullYear
        year = 2019
        const regex_year = new RegExp((parseInt(year)), 'i')
        // i for case insensitive
        try {
            const actionList = await Movie.find({
                title: { $regex: regex_year },
                genres: "Action"

            }).skip(parseInt(page))
            .limit(parseInt(limit))
            
            const adventureList = await Movie.find({
                title: { $regex: regex_year },
                genres: "Adventure"

            }).skip(parseInt(page))
            .limit(parseInt(limit))
            const animationList = await Movie.find({
                title: { $regex: regex_year },
                genres: "Animation"

            }).skip(parseInt(page))
            .limit(parseInt(limit))
            
            const childrenList = await Movie.find({
                title: { $regex: regex_year },
                genres: "Children"

            }).skip(parseInt(page))
            .limit(parseInt(limit))
            const comedyList = await Movie.find({
                title: { $regex: regex_year },
                genres: "Comedy"

            }).skip(parseInt(page))
            .limit(parseInt(limit))
            
            const crimeList = await Movie.find({
                title: { $regex: regex_year },
                genres: "Crime"

            }).skip(parseInt(page))
            .limit(parseInt(limit))
            const documentaryList = await Movie.find({
                title: { $regex: regex_year },
                genres: "Documentary"

            }).skip(parseInt(page))
            .limit(parseInt(limit))
            
            const dramaList = await Movie.find({
                title: { $regex: regex_year },
                genres: "Drama"

            }).skip(parseInt(page))
            .limit(parseInt(limit))
            const fantasyList = await Movie.find({
                title: { $regex: regex_year },
                genres: "Fantasy"

            }).skip(parseInt(page))
            .limit(parseInt(limit))
            
            const filmNoirList = await Movie.find({
                title: { $regex: regex_year },
                genres: "Film-Noir"

            }).skip(parseInt(page))
            .limit(parseInt(limit))
            const horrorList = await Movie.find({
                title: { $regex: regex_year },
                genres: "Horror"

            }).skip(parseInt(page))
            .limit(parseInt(limit))
            
            const musicalList = await Movie.find({
                title: { $regex: regex_year },
                genres: "Musical"

            }).skip(parseInt(page))
            .limit(parseInt(limit))
            const mysteryList = await Movie.find({
                title: { $regex: regex_year },
                genres: "Mystery"

            }).skip(parseInt(page))
            .limit(parseInt(limit))
            
            const romanceList = await Movie.find({
                title: { $regex: regex_year },
                genres: "Romance"

            }).skip(parseInt(page))
            .limit(parseInt(limit))
            const sciFiList = await Movie.find({
                title: { $regex: regex_year },
                genres: "Sci-Fi"

            }).skip(parseInt(page))
            .limit(parseInt(limit))
            const thrillerList = await Movie.find({
                title: { $regex: regex_year },
                genres: "Thriller"

            }).skip(parseInt(page))
            .limit(parseInt(limit))
            const warList = await Movie.find({
                title: { $regex: regex_year },
                genres: "War"

            }).skip(parseInt(page))
            .limit(parseInt(limit))
            
            const westernList = await Movie.find({
                title: { $regex: regex_year },
                genres: "Western"

            }).skip(parseInt(page))
            .limit(parseInt(limit))

            // .skip(parseInt(page))
            // .limit(parseInt(limit))
            // .then(function (movies) {

            // return response with posts, total pages, and current page
            res.status(200).send({ recents: { actionList,adventureList,animationList,childrenList,comedyList,crimeList,documentaryList,dramaList,fantasyList,filmNoirList,horrorList,musicalList,mysteryList,romanceList,sciFiList,thrillerList,warList,westernList }, page, limit });
            // });

        } catch (err) {
            //return error response
            return res.status(500).send(err);
        }
    },


    //Return list movies by rating
    async getMoviesByRating(req, res) {

        const { page = 1, limit = 10 } = req.query;
        const regex_rating = new RegExp(parseInt(req.query.rating), 'i') // i for case insensitive
        try {
            const movies = await Teste.aggregate([{
                "$group": {
                    _id: "$movieId",
                    avg_rating: { $avg: "$rating" },
                    soma: { $sum: 1 }
                },



            }



                ,

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

        // console.log("rating:" + req.query.rating)
        // //const regex_rating = new RegExp(parseFloat(req.query.rating), 'i') // i for case insensitive
        // Rating.find({ rating: req.query.rating }).sort({ 'timestamp': -1 }).limit(50).then(function (ratings) {
        //     res.send(ratings);
        // });
    },

}










