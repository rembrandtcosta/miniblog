import Link from "next/link";

function renderPageNumber(page: number) {
  return `/home/${page}`;
}

function getPageNumbers(currentPage: number): any[] {
  if (currentPage < 5)
    return [1, 2, 3, 4, 'Next ->'];
  if (currentPage == 5)
    return [1, 2, 3, 4, 5, 'Next ->'];
  return [1, 2, 3, '...', currentPage, 'Next ->'];
}

export default function Pagination(props: { currentPage: number }) {
  const { currentPage } = props; 

  return (
    <div className="flex items-center justify-center my-8">
      {getPageNumbers(currentPage).map((pageNumber, i) =>
        pageNumber === '...' ? (
          <span
            key={i}
            className="px-4 py-2 rounded-full text-sm font-semibold text-black"
          >
            {pageNumber}
          </span>
        ) : pageNumber === 'Next ->' ? (
          <Link
            key={i}
            href={renderPageNumber(currentPage + 1 as number)}
            className="text-black px-4 py-2 mx-1 rounded-full text-sm font-semibold no-underline"
          >
            {pageNumber}
          </Link>
        ) :
        (
          <Link
            key={i}
            href={renderPageNumber(pageNumber as number)}
            className={`${
              pageNumber == currentPage ? 'text-cyan-500' : 'text-black'
            } px-4 py-2 mx-1 rounded-full text-sm font-semibold no-underline`}
          >
            {pageNumber}
          </Link>
        )
      )}
    </div>
  );
}
