import './App.css'
import { useMovies } from './hooks/useMovies.tsx'
import { useSearch } from './hooks/useSearch.tsx'
import { Movies } from './components/Movies.tsx'
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import debounce from 'just-debounce-it'

function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading ,getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('render333')
      getMovies({ search })
    }, 300)
  , [getMovies])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.currentTarget.value;
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Search for movies</h1>
        <form onSubmit={event => handleSubmit(event)} className='form'>
          {/* <input ref={inputRef} placeholder='Avengers, Star Wars, The Matrix...' /> */}
          {/* {`search = ${search}` } */}
          {/* {`responseMovies = `+JSON.stringify(responseMovies, null, 2) } */}
          {/* {`movies = `+JSON.stringify(movies, null, 2) } */}
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            name='query'
            onChange={event => handleChange(event)}
            value={search}
            placeholder='Avengers, Star Wars, The Matrix...'
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Search</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>
      <main>
        {loading ? <p>Loading ...</p> : <Movies movies={movies ? movies : {Search:[]}} />}
      </main>
    </div>
  )
}

export default App
