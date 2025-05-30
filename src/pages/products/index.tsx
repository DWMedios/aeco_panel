import { useEffect, useState } from 'react'
import MainLayout from '../../components/layout'
import Tabs from '../../components/tabs'
import Title from '../../components/title'
import ContentTabs from '../../components/tabs/components/contentTabs'
import Table from '../../components/table'
import usePagination from '../../hooks/usePagination'
import { Alert, Reward } from '../../interfaces/types'
import { useWebApiProducts } from '../../api/webApiProduct'
import Filters from '../../components/filters'
import ModalCapacities from './components/ModalCapacities'
import ModalProducts from './components/ModalProducts'
import { useWebApiCapacities } from '../../api/webApiCapacity'

const Products = () => {
  const [showAlert, setShowAlert] = useState<Alert | null>(null)
  const [tab, setTab] = useState<string>('products')
  const [products, setProducts] = useState<any>([])
  const [capacities, setCapacities] = useState<any>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')
  const [formData, setFormData] = useState<any | Record<string, any>>({})

  const { getProducts, deleteProduct } = useWebApiProducts()
  const { getCapacities, deleteCapacity } = useWebApiCapacities()
  const { page, totalPages, setPage, refresh, setFilters, setDefaultFilters } =
    usePagination<Reward>(getProducts, 10, setProducts)

  const tabs = [
    { name: 'Productos', value: 'products' },
    { name: 'Capacidades', value: 'capacity' },
  ]
  const paginationCapacities = usePagination(getCapacities, 10, setCapacities)

  useEffect(() => {
    if (tab == 'products') {
      setFilters({})
      setDefaultFilters({})
    } else {
      paginationCapacities.refresh()
    }
    setPage(1)
  }, [tab])

  useEffect(() => {
    if (formData.id) {
      setTitleModal('Editar')
    }
  }, [formData])

  const handleDelete = async (id: number) => {
    try {
      if (tab === 'products') {
        await deleteProduct(id)
        refresh()
        setIsOpen(false)
        setShowAlert({
          message: 'El producto ha sido eliminado correctamente',
          type: 'success',
        })
      } else {
        await deleteCapacity(id)
        paginationCapacities.refresh()
        setIsOpen(false)
        setShowAlert({
          message: 'La capacidad ha sido eliminada correctamente',
          type: 'success',
        })
      }
    } catch (error: any) {
      setShowAlert({
        message: error.message,
        type: 'error',
      })
      console.error('Error deleting user:', error)
    }
  }

  return (
    <MainLayout alertProps={showAlert}>
      <Title title="Productos" />
      <div className="flex justify-between items-center mt-10 w-full">
        <Tabs tabs={tabs} selected={tab} action={(data) => setTab(data)} />
      </div>
      <ContentTabs>
        <Filters
          addButton={true}
          filters={
            tab == 'products'
              ? [
                  { name: 'name', label: 'Nombre' },
                  { name: 'family', label: 'Familia' },
                  { name: 'code', label: 'Codigo' },
                ]
              : [
                  { name: 'description', label: 'Nombre' },
                  { name: 'packaging', label: 'Empaque' },
                  { name: 'factor', label: 'Factor' },
                  { name: 'weight', label: 'Peso' },
                ]
          }
          setFilters={
            tab === 'products' ? setFilters : paginationCapacities.setFilters
          }
          openModal={() => {
            setTitleModal('Crear')
            setIsOpen(true)
            setFormData({})
          }}
        />
        {tab === 'products' ? (
          <Table
            tableContent={{
              headers: ['Folio', 'Nombre', 'Familia', 'Codigo'],
              data: products,
            }}
            columns={['id', 'name', 'family', 'code']}
            openModal={() => {
              setIsOpen(true)
              setFormData({})
            }}
            handleDelete={handleDelete}
            setTitleModal={setTitleModal}
            changePage={setPage}
            page={page}
            pagination={{ page, totalpages: totalPages }}
            setFormData={setFormData}
          />
        ) : (
          <>
            <Table
              tableContent={{
                headers: ['Folio', 'Nombre', 'Empaque', 'Factor', 'Peso'],
                data: capacities,
              }}
              columns={['id', 'description', 'packaging', 'factor', 'weight']}
              pagination={{
                page: paginationCapacities.page,
                totalpages: paginationCapacities.totalPages,
              }}
              changePage={paginationCapacities.setPage}
              page={paginationCapacities.page}
              openModal={() => {
                setIsOpen(true)
                setFormData({})
              }}
              handleDelete={handleDelete}
              setTitleModal={setTitleModal}
              setFormData={setFormData}
            />
          </>
        )}
      </ContentTabs>
      {isOpen &&
        (tab == 'products' ? (
          <ModalProducts
            onClose={() => setIsOpen(false)}
            title={titleModal}
            onSaved={refresh}
            product={formData}
            setShowAlert={setShowAlert}
          />
        ) : (
          <ModalCapacities
            onClose={() => setIsOpen(false)}
            title={titleModal}
            onSaved={refresh}
            capacity={formData}
            setShowAlert={setShowAlert}
          />
        ))}
    </MainLayout>
  )
}

export default Products
