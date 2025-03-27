interface Props {
  title: string
}

const Title = ({ title }: Props) => {
  return <span className="text-3xl">{title}</span>
}

export default Title
