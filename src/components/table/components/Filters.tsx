interface props {
  filters: string[]
}

const Filters = ({ filters }: props) => {
  return (
    <>
      <div className=" w-full flex justify-between items-center p-2">
        <div className="border-r-2 border-gray-300">
          <span className="text-gray-400 p-2">Filtros</span>
        </div>
        {filters.map((filter, index) => (
          <input
            key={index}
            placeholder={filter}
            className="text-sm text-dark-gray border-2 border-dark-gray rounded-full px-2 py-1 m-1"
          />
        ))}
        <button>
          <img src="/images/search.png" alt="" />
        </button>
      </div>
    </>
  )
}

export default Filters
