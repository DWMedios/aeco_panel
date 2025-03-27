import { ColumnType } from '../../../../interfaces/table'
import { Company, Rewards, User } from '../../../../interfaces/types'
import ActtionMenu from '../ActionMenu'

interface Props {
  content: (User | Company | Rewards)[]
  columns: (string | ColumnType)[]
  setTitleModal?: (title: string) => void
  openModal?: () => void
  openModalDelete?: () => void
}

const TBody = ({
  content,
  columns,
  setTitleModal,
  openModal,
  openModalDelete,
}: Props) => {
  return (
    <tbody className="relative overflow-visible ">
      {content.map(
        (item, index) => (
          console.log(item),
          (
            <tr
              key={index}
              className={`relative bg-[#F8F8F8] text-center ${
                index < content.length - 1 &&
                'border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'
              } group`}
            >
              {columns.map((column, colIndex) => {
                const columnName =
                  typeof column === 'string' ? column : column.column
                const columnType =
                  typeof column === 'object' ? column.type : 'text'

                return (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 text-gray-900 dark:text-white 
        ${
          index === content.length - 1 &&
          (colIndex === 0
            ? 'rounded-es-full'
            : colIndex === columns.length - 1
            ? 'rounded-ee-full'
            : '')
        }
        ${
          colIndex > 0 && colIndex < columns.length - 1
            ? 'border-s border-e dark:bg-gray-800 dark:border-gray-700 border-gray-200'
            : ''
        }`}
                  >
                    {columnType === 'chip' ? (
                      <span
                        id="badge-dismiss-green"
                        className={`inline-flex justify-center items-center px-2 py-1 me-2 text-sm font-medium text-white ${
                          item[columnName as keyof typeof item]
                            ? 'bg-green-600'
                            : 'bg-red-600'
                        } rounded-full w-[70px]`}
                      >
                        {item[columnName as keyof typeof item]
                          ? 'Activo'
                          : 'Inactivo'}
                      </span>
                    ) : (
                      item[columnName as keyof typeof item] ?? '-'
                    )}
                  </td>
                )
              })}

              <td className="relative bg-white">
                <ActtionMenu
                  setTitleModal={setTitleModal}
                  openModal={openModal}
                  openModalDelete={openModalDelete}
                />
              </td>
            </tr>
          )
        )
      )}
    </tbody>
  )
}

export default TBody
