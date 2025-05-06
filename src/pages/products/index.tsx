import { useState } from 'react'
import MainLayout from '../../components/layout'
import Tabs from '../../components/tabs'
import Title from '../../components/title'
import ContentTabs from '../../components/tabs/components/contentTabs'
import Table from '../../components/table'
import usePagination from '../../hooks/usePagination'
import { Reward } from '../../interfaces/types'
import { useWebApiProducts } from '../../utils/api/webApiProduct'
import Filters from '../../components/filters'

const Products = () => {
  const [tab, setTab] = useState<string>('products')
  const [products, setProducts] = useState<any>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')
  const { getProducts, getCapacities } = useWebApiProducts()
  const { page, totalPages, setPage, refresh, setFilters } =
    usePagination<Reward>(getProducts, 10, setProducts)

  const tabs = [
    { name: 'Productos', value: 'products' },
    { name: 'Capacidades', value: 'capacity' },
  ]

  return (
    <MainLayout>
      <Title title="Productos" />
      <div className="flex justify-between items-center mt-10 w-full">
        <Tabs tabs={tabs} selected={tab} action={(data) => setTab(data)} />
      </div>
      <ContentTabs>
        <Filters
          addButton={true}
          filters={[
            { name: 'folio', label: 'Folio' },
            { name: 'name', label: 'Nombre' },
            { name: 'family', label: 'Familia' },
            { name: 'code', label: 'Codigo' },
          ]}
          setFilters={setFilters}
        />
        <Table
          tableContent={{
            headers: ['Folio', 'Nombre', 'Familia', 'Codigo'],
            data: products,
          }}
          columns={['id', 'name', 'family', 'code']}
          openModal={() => setIsOpen(true)}
          setTitleModal={setTitleModal}
          handleDelete={() => {}}
          pagination={{ page, totalpages: totalPages }}
          changePage={setPage}
        />
      </ContentTabs>
    </MainLayout>
  )
}

export default Products
