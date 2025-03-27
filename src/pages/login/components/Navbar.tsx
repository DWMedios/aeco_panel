interface Props {
  title: string
}

const NavbarLogin = ({ title }: Props) => {
  return (
    <div className="flex justify-between items-center w-[50%] mb-6">
      <div className="w-1/2">
        <span className="text-bold text-xl" style={{ fontWeight: 800 }}>
          Inicio de Sesión
        </span>
      </div>
      <div className="w-1/2 flex justify-end">
        <span className="text-[#64748B]">
          Panel de Control / <span className="text-[#3C50E0]">{title}</span>
        </span>
      </div>
    </div>
  )
}

export default NavbarLogin
