import React, { useEffect, useState } from 'react'
import { 
  CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableRow, 
  CTableHeaderCell, CTableBody, CTableDataCell, CButton, CBadge 
} from '@coreui/react'
import { supabase } from '../../services/supabaseClient'

const Cotizaciones = () => {
  const [cotizaciones, setCotizaciones] = useState([])

  useEffect(() => { fetchCotizaciones() }, [])

  const fetchCotizaciones = async () => {
    const { data } = await supabase.from('cotizaciones').select('*').order('created_at', { ascending: false })
    setCotizaciones(data || [])
  }

  const toggleEstado = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === 'pendiente' ? 'completado' : 'pendiente'
    await supabase.from('cotizaciones').update({ estado: nuevoEstado }).eq('id', id)
    fetchCotizaciones()
  }

  return (
    <CCard>
      <CCardHeader><strong>Gestión de Cotizaciones</strong></CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Nombre Completo</CTableHeaderCell>
              <CTableHeaderCell>Contacto</CTableHeaderCell>
              <CTableHeaderCell>Producto (Link)</CTableHeaderCell>
              <CTableHeaderCell>Vehículo</CTableHeaderCell>
              <CTableHeaderCell>Estado</CTableHeaderCell>
              <CTableHeaderCell>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {cotizaciones.map(c => (
              <CTableRow key={c.id}>
                <CTableDataCell>{`${c.nombre} ${c.apellido}`}</CTableDataCell>
                <CTableDataCell>
                  <div>{c.email}</div>
                  <small className="text-body-secondary">{c.telefono}</small>
                </CTableDataCell>
                <CTableDataCell>
                  <a href={c.link_producto} target="_blank" rel="noreferrer">Ver Link</a>
                </CTableDataCell>
                <CTableDataCell>{`${c.marca} ${c.modelo}`}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color={c.estado === 'pendiente' ? 'warning' : 'success'}>{c.estado}</CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton size="sm" color="info" onClick={() => toggleEstado(c.id, c.estado)}>
                    {c.estado === 'pendiente' ? 'Completar' : 'Reabrir'}
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}
export default Cotizaciones