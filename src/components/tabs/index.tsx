interface Props {
  tabs: string[]
  action: (key: string) => void
}

const Tabs = ({ tabs, action }: Props) => {
  return (
    <div className="border-b-2 border-gray-200 dark:border-gray-700 w-full">
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className="py-2 px-4 cursor-pointer text-black bg-[#CBCBCB] rounded-t-3xl w-32"
            onClick={() => action(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Tabs
