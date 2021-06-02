import { Input } from 'semantic-ui-react'
 
function ReviewsFilter({ sortTerm, setSortTerm, filterTerm, setFilterTerm }) {
  return (
    <div className="filter-controls">
      <Input onChange={(e) => setFilterTerm(e.target.value)} value={filterTerm} placeholder="filter by title"/>
      <select value={sortTerm} onChange={(e) => setSortTerm(e.target.value)}>
        <option value="default">Most Recent</option>
        <option value="oldest">Least Recent</option>
        <option value="year asc">Year Released(Asc)</option>
        <option value="year desc">Year Released(Desc)</option>
        <option value="rating asc">Rating(Asc)</option>
        <option value="rating desc">Rating(Desc)</option>
      </select>
    </div>
  )
}

export default ReviewsFilter