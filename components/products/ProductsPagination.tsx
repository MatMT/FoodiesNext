import Link from "next/link";

interface ProductsPaginationProps {
  page?: number;
  totalPages?: number;
}

export default function ProductsPagination({
  page = 1,
  totalPages = 0,
}: ProductsPaginationProps) {
  if (totalPages <= 1) {
    return null; // No pagination needed if there's only one page
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Previous
        </button>
        <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center justify-center">
        {/* <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">100</span> results
          </p>
        </div> */}
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {page > 1 && (
              <Link
                href={`/admin/products?page=${page - 1}`}
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>←
              </Link>
            )}

            {pages.map(currentPage => {
              return (
                <Link
                  key={currentPage}
                  href={`/admin/products?page=${currentPage}`}
                  className={`relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium ${
                    currentPage == page
                      ? "z-10 bg-blue-50 text-blue-600 border-blue-500"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {currentPage}
                </Link>
              );
            })}

            {page < totalPages && (
              <Link
                href={`/admin/products?page=${page + 1}`}
                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>→
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
