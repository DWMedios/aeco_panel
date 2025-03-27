import { useState } from 'react'
import MainLayout from '../../components/layout'
import Table from '../../components/table'
import Title from '../../components/title'
import ModalUsers from './components/ModalUsers'
import { users } from '../../constants/dumies/users'

const Users = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')

  return (
    <MainLayout>
      <Title title="Users" />
      <Table
        addButton={true}
        filters={['Folio', 'Nombre', 'Direccion', 'RFC', 'Estatus']}
        tableContent={{
          headers: ['Folio', 'Nombre', 'Telefono', 'Correo', 'Rol', 'Empresa'],
          data: users,
        }}
        columns={['id', 'name', 'phone', 'email', 'role', 'company']}
        openModal={() => setIsOpen(true)}
        setTitleModal={setTitleModal}
      />
      {isOpen && (
        <ModalUsers onClose={() => setIsOpen(false)} title={titleModal} />
      )}
    </MainLayout>
  )
}
export default Users
