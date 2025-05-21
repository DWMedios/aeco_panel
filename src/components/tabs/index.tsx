interface Props {
  tabs: Record<string, any>[]
  action: (key: string) => void
  selected?: string
}

const Tabs = ({ tabs, action, selected }: Props) => {
  return (
    <div className="border-b-2 border-gray-200 dark:border-gray-700 w-full">
      <ul className="flex flex-wrap text-xs font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`py-2 px-2 cursor-pointer text-black ${
              selected == tab.value ? 'bg-gray-600 text-white' : 'bg-[#CBCBCB]'
            }  rounded-t-3xl w-24`}
            onClick={() => action(tab.value)}
          >
            {tab.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Tabs
