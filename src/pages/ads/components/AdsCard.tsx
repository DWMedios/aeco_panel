interface Props {
  img: string
  name: string
}

const AdsCard = ({ img, name }: Props) => {
  return (
    <div className="flex justify-center items-center bg-gray-200 w-52 h-28 rounded-3xl ">
      {img != '' ? <img src={img} alt="" /> : name}
    </div>
  )
}

export default AdsCard
