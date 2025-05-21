import { useEffect, useState } from 'react'
import MainLayout from '../../components/layout'
import Tabs from '../../components/tabs'
import Title from '../../components/title'
import ContentTabs from '../../components/tabs/components/contentTabs'
import Table from '../../components/table'
import usePagination from '../../hooks/usePagination'
import { Reward } from '../../interfaces/types'
import { useWebApiProducts } from '../../utils/api/webApiProduct'
import Filters from '../../components/filters'
import ModalCapacities from './components/ModalCapacities'
import ModalProducts from './components/ModalProducts'
import { useWebApiCapacities } from '../../utils/api/webApiCapacity'

const Products = () => {
  const [tab, setTab] = useState<string>('products')
  const [products, setProducts] = useState<any>([])
  const [capacities, setCapacities] = useState<any>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')
  const [formData, setFormData] = useState<any | Record<string, any>>({})

  const { getProducts } = useWebApiProducts()
  const { getCapacities } = useWebApiCapacities()
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

  return (
    <MainLayout>
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
                  { name: 'folio', label: 'Folio' },
                  { name: 'name', label: 'Nombre' },
                  { name: 'family', label: 'Familia' },
                  { name: 'code', label: 'Codigo' },
                ]
              : [
                  { name: 'id', label: 'Folio' },
                  { name: 'description', label: 'Descripcion' },
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
            pagination={{ page, totalpages: totalPages }}
            changePage={setPage}
            page={page}
            openModal={() => {
              setIsOpen(true)
              setFormData({})
            }}
            setTitleModal={setTitleModal}
            handleDelete={() => {}}
          />
        ) : (
          <>
            <Table
              tableContent={{
                headers: ['Folio', 'Decripcion', 'Empaque', 'Factor', 'Peso'],
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
              setTitleModal={setTitleModal}
              handleDelete={() => {}}
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
            reward={formData}
          />
        ) : (
          <ModalCapacities
            onClose={() => setIsOpen(false)}
            title={titleModal}
            onSaved={refresh}
            reward={formData}
          />
        ))}
    </MainLayout>
  )
}

export default Products
