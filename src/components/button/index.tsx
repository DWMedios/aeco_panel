interface Props {
  text: string
  action: () => void
  bg?: string
}

const Button = ({ text, action, bg = 'bg-gray-300' }: Props) => {
  return (
    <button
      className={`rounded-full ${bg} w-full p-2  dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition`}
      onClick={action}
    >
      {text}
    </button>
  )
}

export default Button
