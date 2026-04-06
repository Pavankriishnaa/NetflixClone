import React from 'react'

const SearchContext = React.createContext({
  searchInput: '',
  moviesList: [],
  status: 'INITIAL',
  onChangeSearchInput: () => {},
  getSearchResults: () => {},
})

export default SearchContext
