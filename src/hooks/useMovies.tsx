import { useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/moviesService'

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [, setError] = useState('')
  const previousSearch = useRef(search)

  const getMovies = useMemo(() => {
    return async ({ search }) => {
      if (search === previousSearch.current) return;
      try {
        setLoading(true)
        setError('')
        previousSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
  },[])

  //useMemo to only sort when sort or movies have changed
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => {
        return a?.title.toString().localeCompare(b?.title.toString())
      })
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, loading, getMovies }
}