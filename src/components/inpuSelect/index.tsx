interface Props {
  name: string
  placeholder: string
  options?: string[]
  bg?: string
  textColor?: string
}

const InputSelct = ({ name, placeholder, bg = '#ffff', textColor }: Props) => {
  return (
    <select
      name={name}
      style={{ background: bg, color: textColor ?? textColor }}
      id="countries"
      className={`border-2 border-gray-300
       text-gray-400 text-sm rounded-full 
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
    >
      <option selected>{placeholder}</option>
      <option value="US">United States</option>
      <option value="CA">Canada</option>
      <option value="FR">France</option>
      <option value="DE">Germany</option>
    </select>
  )
}
export default InputSelct
