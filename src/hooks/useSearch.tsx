import { useEffect, useRef, useState } from "react"

export function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState('')
  const isFirstInput = useRef(true)

  useEffect(() => {
    // To know if it is the first time rendering the component
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      // console.log('isFirstInput.current 1 = ', isFirstInput.current)
      return
    }
    if (search === '') {
      setError('Empty movie')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('Cannot search only numbers')
      return
    }
    if (search.length <= 2) {
      setError('Cannot search small strings')
      return
    }

    setError('')
  }, [search, ])

  return { search, updateSearch, error }
}