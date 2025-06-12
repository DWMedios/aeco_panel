interface Props {
  headers: string[]
}

const THeader = ({ headers }: Props) => {
  return (
    <thead className="text-sm font-medium text-gray-700 bg-dark-gray dark:bg-gray-700 dark:text-gray-400 text-center">
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            scope="col"
            className={`px-6 py-2 ${
              index == 0
                ? 'rounded-s-full'
                : index == headers.length - 1
                ? 'rounded-e-full'
                : ''
            }`}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default THeader
