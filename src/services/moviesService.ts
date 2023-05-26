const API_KEY = '6eca3ce1'

export async function searchMovies ({ search }) {
  if (search === '') return null

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)

    /* await new Promise((resolve) =>
      setTimeout(() => resolve(()=>console.log('loading')), 3000)
    ); */

    const json = await response.json()

    const movies = json.Search

    return movies.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster
    }))
  } catch (error) {
    throw new Error('Error searching movies')
  } finally {

  }
}