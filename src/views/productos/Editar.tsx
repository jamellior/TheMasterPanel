import React, { useEffect, useState } from 'react'
import {
  CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableRow,
  CTableHeaderCell, CTableBody, CTableDataCell, CBadge, CButton,
  CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CForm, CFormInput, CFormSelect
} from '@coreui/react'
import { supabase } from '../../services/supabaseClient'

const Editar = () => {
  const [productos, setProductos] = useState([])
  const [visible, setVisible] = useState(false)
  const [editData, setEditData] = useState({})

  useEffect(() => {
    fetchInventario()
  }, [])

  const fetchInventario = async () => {
    const { data, error } = await supabase.from('inventario').select('*')
    if (error) console.error('Error al cargar inventario:', error)
    else setProductos(data || [])
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      await supabase.from('inventario').delete().eq('id', id)
      fetchInventario()
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    await supabase.from('inventario').update(editData).eq('id', editData.id)
    setVisible(false)
    fetchInventario()
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
              <CTableHeaderCell>Acciones</CTableHeaderCell>
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
                  {item.cantidad <= 0 ? <CBadge color="danger">Fuera de Stock</CBadge> : <CBadge color="success">{item.cantidad}</CBadge>}
                </CTableDataCell>
                <CTableDataCell>${item.precio}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="info" size="sm" className="me-2" onClick={() => { setEditData(item); setVisible(true) }}>Editar</CButton>
                  <CButton color="danger" size="sm" onClick={() => handleDelete(item.id)}>Eliminar</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader><CModalTitle>Editar Producto</CModalTitle></CModalHeader>
          <CModalBody>
            <CForm onSubmit={handleUpdate}>
              <CFormInput className="mb-3" label="Número de Producto" value={editData.numero_producto || ''} onChange={e => setEditData({...editData, numero_producto: e.target.value})} />
              <CFormInput className="mb-3" label="Marca" value={editData.marca || ''} onChange={e => setEditData({...editData, marca: e.target.value})} />
              <CFormInput className="mb-3" label="Modelo" value={editData.modelo || ''} onChange={e => setEditData({...editData, modelo: e.target.value})} />
              <CFormInput className="mb-3" label="Tipo" value={editData.tipo || ''} onChange={e => setEditData({...editData, tipo: e.target.value})} />
              <CFormInput className="mb-3" label="Cantidad" type="number" value={editData.cantidad || ''} onChange={e => setEditData({...editData, cantidad: e.target.value})} />
              <CFormInput className="mb-3" label="Precio" type="number" value={editData.precio || ''} onChange={e => setEditData({...editData, precio: e.target.value})} />
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>Cancelar</CButton>
                <CButton color="primary" type="submit">Guardar</CButton>
              </CModalFooter>
            </CForm>
          </CModalBody>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

export default Editar