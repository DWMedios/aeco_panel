import { ColumnType } from '../../../../interfaces/table'
import { Aeco, Company, Rewards, User } from '../../../../interfaces/types'
import { chipColor, chipText } from '../../../../utils/chipColor'
import ActtionMenu from '../ActionMenu'

interface Props {
  content: (User | Company | Aeco | Rewards | Record<string, any>)[]
  columns: (string | ColumnType)[]
  setTitleModal?: (title: string) => void
  openModal?: () => void
  openModalDelete?: () => void
  setDeleteId: (id: number) => void
  setFormData?: (data: any) => void
}

const TBody = ({
  content = [],
  columns,
  setTitleModal,
  openModal,
  openModalDelete,
  setDeleteId,
  setFormData,
}: Props) => {
  return (
    <tbody className="relative overflow-visible ">
      {content.map((item, index) => (
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
            const columnType = typeof column === 'object' ? column.type : 'text'

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
                    className={`inline-flex justify-center items-center px-2 py-1 me-2 text-sm font-medium text-white ${chipColor(
                      item[columnName as keyof typeof item] as string
                    )} rounded-full min-w-[70px]`}
                  >
                    {chipText(item[columnName as keyof typeof item])}
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
              item={item}
              setDeleteId={(id: number) => setDeleteId(id)}
              setFormData={setFormData}
            />
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export default TBody
