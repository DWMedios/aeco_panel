interface Props {
  title: string
}

const NavbarLogin = ({ title }: Props) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full md:w-[80%] mb-6 gap-4 md:gap-0">
      <div className="w-full md:w-1/2">
        <span className="text-bold text-xl" style={{ fontWeight: 800 }}>
          Inicio de Sesión
        </span>
      </div>
      <div className="w-full md:w-1/2 flex justify-start md:justify-end">
        <span className="text-[#64748B]">
          Panel de Control / <span className="text-[#3C50E0]">{title}</span>
        </span>
      </div>
    </div>
  )
}

export default NavbarLogin