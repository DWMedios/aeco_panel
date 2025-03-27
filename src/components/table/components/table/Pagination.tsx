import { CaretLeft, CaretRight } from '@phosphor-icons/react'

interface Props {
  page: number
  setPage: (page: number) => void
  totalPage: number
}

const Pagination = ({ page, setPage, totalPage }: Props) => {
  return (
    <div className="flex justify-between content-center bg-[#F8F8F8] w-[10%] rounded-full px-4 text-gray-500">
      <CaretLeft
        size={25}
        weight="bold"
        onClick={() => console.log('Previous')}
      />
      {page} de {totalPage}
      <CaretRight size={25} weight="bold" onClick={() => console.log('Next')} />
    </div>
  )
}

export default Pagination
