import { Input, Dropdown } from 'semantic-ui-react'
 
function ReviewsFilter({ sortTerm, setSortTerm, filterTerm, setFilterTerm }) {

  const sortOptions = [
    { key: 'default', value: 'default', text: 'Recently Reviewed' },
    { key: 'oldest', value: 'oldest', text: 'Least Recently Reviewed' },
    { key: 'year asc', value: 'year asc', text: 'Release Year(Asc)' },
    { key: 'year desc', value: 'year desc', text: 'Release Year(Desc)' },
    { key: 'rating asc', value: 'rating asc', text: 'Rating(Asc)' },
    { key: 'rating desc', value: 'rating desc', text: 'Rating(Desc)' }
  ]

  function handleChange(e, { value }){ 
    setSortTerm(value)
  }

  return (
    <div className="filter-controls">
      <Input 
        onChange={(e) => setFilterTerm(e.target.value)} value={filterTerm} 
        placeholder="filter by title"
      />
      <Dropdown 
        onChange={handleChange}
        selection
        options={sortOptions}
        value={sortTerm}
      />
    </div>
  )
}

export default ReviewsFilter