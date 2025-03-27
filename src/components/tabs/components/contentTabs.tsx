interface Props {
  children: React.ReactNode
}

const ContentTabs = ({ children }: Props) => {
  return (
    <div className="flex-col justify-between items-center mt-10">
      {children}
    </div>
  )
}

export default ContentTabs
