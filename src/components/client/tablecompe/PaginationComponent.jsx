import React from 'react';

const PaginationComponent = ({ currentPage, pageNumbers, setCurrentPage }) => {
  return (
    <div className="d-flex justify-content-center mt-3">
      <button
        className="btn btn-secondary mr-2"
        onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`btn ${currentPage === number ? 'btn-primary' : 'btn-light'} mx-1`}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </button>
      ))}

      <button
        className="btn btn-secondary ml-2"
        onClick={() => setCurrentPage(currentPage < pageNumbers.length ? currentPage + 1 : currentPage)}
        disabled={currentPage === pageNumbers.length}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationComponent;
