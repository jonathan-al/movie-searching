

function ListOfMovies( { movies } ) {
  return (
    <ul className='movies'>
      {
        movies.map(movie => (
          <li className='movie' key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.image} alt={movie.title} />
          </li>
        ))
      }
    </ul>
  )
}

function NoMoviesResults () {
  return (
    <p>Movies not found</p>
  )
}

export function Movies( { movies } ) {
  // console.log('movies.length : ', movies.length)
  const hasMovies = movies.length > 0

  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMoviesResults />
  )
}