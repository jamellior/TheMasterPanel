import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge
} from '@coreui/react'
import { supabase } from '../../services/supabaseClient'

const Inventario = () => {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetchInventario()
  }, [])

  const fetchInventario = async () => {
    const { data, error } = await supabase.from('inventario').select('*')
    if (error) console.error('Error al cargar inventario:', error)
    else setProductos(data)
  }

  return (
    <CCard>
      <CCardHeader><strong>Inventario Actual</strong></CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID Prod</CTableHeaderCell>
              <CTableHeaderCell>Marca</CTableHeaderCell>
              <CTableHeaderCell>Modelo</CTableHeaderCell>
              <CTableHeaderCell>Tipo</CTableHeaderCell>
              <CTableHeaderCell>Stock</CTableHeaderCell>
              <CTableHeaderCell>Precio</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {productos.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell>{item.numero_producto}</CTableDataCell>
                <CTableDataCell>{item.marca}</CTableDataCell>
                <CTableDataCell>{item.modelo}</CTableDataCell>
                <CTableDataCell>{item.tipo}</CTableDataCell>
                <CTableDataCell>
                  {item.cantidad <= 0 ? (
                    <CBadge color="danger">Fuera de Stock</CBadge>
                  ) : (
                    <CBadge color="success">{item.cantidad}</CBadge>
                  )}
                </CTableDataCell>
                <CTableDataCell>${item.precio}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default Inventario