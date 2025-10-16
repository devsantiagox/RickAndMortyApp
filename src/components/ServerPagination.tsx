import Link from 'next/link';

interface ServerPaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function ServerPagination({ currentPage, totalPages }: ServerPaginationProps) {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-sm text-gray-600 order-2 sm:order-1">
                Página <span className="font-semibold text-purple-600">{currentPage}</span> de{' '}
                <span className="font-semibold text-purple-600">{totalPages}</span>
            </div>

            <div className="flex items-center gap-2 order-1 sm:order-2">
                {/* Previous Button */}
                <Link
                    href={currentPage > 1 ? `/?page=${currentPage - 1}` : '#'}
                    className={`
            px-4 py-2.5 rounded-lg font-medium transition-all duration-300
            ${currentPage > 1
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-md hover:shadow-lg transform hover:scale-105'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }
          `}
                    aria-disabled={currentPage <= 1}
                >
                    <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Anterior
                    </span>
                </Link>

                {/* Page Numbers */}
                <div className="hidden sm:flex items-center gap-2">
                    {getPageNumbers().map((page, index) => {
                        if (page === '...') {
                            return (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="px-3 py-2 text-gray-400"
                                >
                                    ...
                                </span>
                            );
                        }

                        const pageNum = page as number;
                        const isActive = pageNum === currentPage;

                        return (
                            <Link
                                key={pageNum}
                                href={`/?page=${pageNum}`}
                                className={`
                  px-4 py-2.5 rounded-lg font-medium transition-all duration-300
                  ${isActive
                                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-110'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 hover:text-purple-700'
                                    }
                `}
                            >
                                {pageNum}
                            </Link>
                        );
                    })}
                </div>

                {/* Next Button */}
                <Link
                    href={currentPage < totalPages ? `/?page=${currentPage + 1}` : '#'}
                    className={`
            px-4 py-2.5 rounded-lg font-medium transition-all duration-300
            ${currentPage < totalPages
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-md hover:shadow-lg transform hover:scale-105'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }
          `}
                    aria-disabled={currentPage >= totalPages}
                >
                    <span className="flex items-center gap-2">
                        Siguiente
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </Link>
            </div>

            {/* Mobile page indicator */}
            <div className="sm:hidden flex items-center gap-2 order-3">
                <span className="text-xs text-gray-500">
                    {currentPage} / {totalPages}
                </span>
            </div>
        </div>
    );
}
