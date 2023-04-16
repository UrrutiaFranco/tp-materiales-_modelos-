const db = require("../database/models")



module.exports = {
    list: (req , res) => {
        /* Retorna la vista genreList con todos los generos de la db */
        db.Genre.findAll({
          include:[{
            associate:"movies"
          }]
        })
        .then((genres) => {
         return res.render("genresList" , 
       {genres} )
        })
    },

    detail:(req,res) => {
      const genreId = req.params.id;
      db.Genre.findByPk(genreId)
      .then((genre)=> {
         res.render("genresDetail",
         {genre})
      })
    },
}