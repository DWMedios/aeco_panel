interface Props {
  title: string
}

const Title = ({ title }: Props) => {
  return <span className="text-2xl">{title}</span>
}

export default Title
