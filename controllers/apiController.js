const Movie = require("../models/movie");
const Rating = require("../models/rating");
const Link = require("../models/links");

module.exports = {

    //List all movies
    // async listAllMovies(req,res){
    //   await  Movie.find({}).then((movie)=>{
    //         res.send(movie);
    //     });
    // },

    //List movie by id
    async getMoviesById(req, res) {
        await Movie.findOne({ movieId: req.params.id }).then((movie) => {
            res.send(movie);
        });
    },

    //Return movie list by title
    async getMoviesByTitle(req, res) {
        console.log("param:" + req.query.title)

        const regex = new RegExp(req.query.title, 'i') // i for case insensitive

        const { page = 1, limit = 10 } = req.query;

        try {
            // execute query with page and limit values
            const movies = await Movie.aggregate([
                {
                    $match: {
                        title: { $regex: regex }
                    }
                },
                // {$lookup:{
                //     from:"links",
                //     localField:"movieId",
                //     foreignField:"movieId",
                //     as:"links"
                // }},
                // {
                //     $unwind:"$links"
                // },
                //     {$lookup:{
                //     from:"ratings",
                //     localField:"links.movieId",
                //     foreignField:"movieId",
                //     as:"ratings"
                // }},
                // {
                //     $unwind:"$ratings"
                // },

                {
                    '$facet': {
                        metadata: [{ $count: "total" }, { $addFields: { page: page } }],
                        data: [{ $skip: (page - 1) * limit }, { $limit: limit * 1 }] // add projection here wish you re-shape the docs
                    }
                }
            ])
            // get total documents in the Posts collection 
            const count = await Movie.countDocuments();

            // return response with posts, total pages, and current page
            res.json({
                movies
            });
        } catch (err) {
            console.error(err.message);
        }

    },

    //Return genre list to use in dropdown
    async getGenres(req, res) {
        var genres = ({
            '1': 'Action',
            '2': 'Adventure',
            '3': 'Animation',
            '4': 'Children',
            '5': 'Comedy',
            '6': 'Crime',
            '7': 'Documentary',
            '8': 'Drama',
            '9': 'Fantasy',
            '10': 'Film-Noir',
            '11': 'Horror',
            '12': 'Musical',
            '13': 'Mystery',
            '14': 'Romance',
            '15': 'Sci-Fi',
            '16': 'Thriller',
            '17': 'War',
            '18': 'Western',
        });
        res.send(genres)

    },

    //Return list movies by year and genres
    async getMoviesByYearByGenres(req, res) {
        const { page = 1, limit = 10 } = req.query;
        const regex_year = new RegExp(parseInt(req.query.year), 'i') // i for case insensitive
        try {
            const movies = await Movie.aggregate([{
                $match: {
                    title: { $regex: regex_year },
                    genres: "Action"
                }
            },
            {
                '$facet': {
                    metadata: [{ $count: "total" }, { $addFields: { page: page } }],
                    data: [{ $skip: (page - 1) * limit }, { $limit: limit * 1 }] // add projection here wish you re-shape the docs
                }
            }])

            // return response with posts, total pages, and current page
            res.json({
                movies
            });
        } catch (err) {
            console.error(err.message);
        }
    },


    //Return list movies by rating
    async getMoviesByRating(req, res) {

        const { page = 1, limit = 10 } = req.query;
        const regex_year = new RegExp(parseInt(req.query.rating), 'i') // i for case insensitive
        try {
            const movies = await Rating.aggregate([{
                $match: {
                    rating:  5 ,
                }
            },
            {
                '$facet': {
                    metadata: [{ $count: "total" }, { $addFields: { page: page } }],
                    data: [{ $skip: (page - 1) * limit }, { $limit: limit * 1 }] // add projection here wish you re-shape the docs
                }
            }])

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











