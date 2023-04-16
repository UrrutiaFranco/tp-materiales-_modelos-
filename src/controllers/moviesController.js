const db = require("../database/models")
const Op = db.sequelize.Op;
/* const {Op} = require("sequelize") */


module.exports = {
    list: (req , res) => {
        /* Retorna la vista genreList con todos los generos de la db */
        db.Movie.findAll({
          include:[{association:"actors"}]
        })
        .then((movies) => {
         return res.render("moviesList" , 
       {movies} )
        })
    },
    new : (req,res)=> {
       db.Movie.findAll({
        order:[["release_date" , "DESC"]]
       })
       .then((movies)=>{
        return res.render("newestMovies" , {movies})
       })
    },
    recomended:(req,res) => {
        db.Movie.findAll({
        where : {
            reating:{[Op.gte]: 10},
            
        },
        order : [["rating" , "DESC"]],
        limit : 5 ,
        })
        .then((movies)=>{
           res.render("recommendedMovies" , 
           {movies})
        })

    },
    detail:(req,res) => {
      const movieId = req.params.movieId
      db.Movie.findByPk({
        include:[{
          association:"actors"
        }]
      }
      
      )
      .then((movie)=>{
        res.render("moviesDetail" , 
       {movie} )
      })
    },

}