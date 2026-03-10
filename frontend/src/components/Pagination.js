const Pagination = ({ page, totalPages, onPageChange }) => {
    const handlePrev = () => {
        if (page > 1) {
            onPageChange(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            onPageChange(page + 1);
        }
    };

    return (
        <div className="flex justify-center mt-6">
            <button
                onClick={handlePrev}
                disabled={page === 1}
                className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
                Previous
            </button>
            <span className="px-4 py-2 mx-1">
                Page {page} of {totalPages}
            </span>
            <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;