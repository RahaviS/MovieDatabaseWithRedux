import './index.css'

const Pagination = ({currentPage, totalPages, setPageNo}) => {
  const onClickPrevPage = () => {
    if (currentPage > 1) {
      setPageNo(currentPage - 1)
    } else {
      setPageNo(currentPage)
    }
  }
  const onClickNextPage = () => {
    if (currentPage < totalPages) {
      setPageNo(currentPage + 1)
    } else {
      setPageNo(currentPage)
    }
  }
  return (
    <div className="page-container">
      <button type="button" className="page-btn" onClick={onClickPrevPage}>
        Prev
      </button>
      <button type="button" className="page-btn" onClick={onClickNextPage}>
        Next
      </button>
    </div>
  )
}

export default Pagination
