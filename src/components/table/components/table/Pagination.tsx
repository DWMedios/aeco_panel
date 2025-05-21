import { CaretLeft, CaretRight } from '@phosphor-icons/react'

interface Props {
  page: number
  changePage: (page: number) => void
  totalPage: number
}

const Pagination = ({ page, changePage, totalPage }: Props) => {
  const goToPreviousPage = () => {
    if (page > 1) {
      changePage(page - 1)
    }
  }

  const goToNextPage = () => {
    if (page < totalPage) {
      changePage(page + 1)
    }
  }

  return (
    <div className="flex justify-between items-center bg-[#F8F8F8] w-56 rounded-full px-2 text-gray-500">
      <CaretLeft
        size={20}
        weight="bold"
        onClick={goToPreviousPage}
        className={
          page === 1 ? 'cursor-not-allowed text-gray-300' : 'cursor-pointer'
        }
      />
      {page} de {totalPage}
      <CaretRight
        size={20}
        weight="bold"
        onClick={goToNextPage}
        className={
          page === totalPage
            ? 'cursor-not-allowed text-gray-300'
            : 'cursor-pointer'
        }
      />
    </div>
  )
}

export default Pagination
