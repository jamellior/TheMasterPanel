import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CForm, CFormInput, CFormSelect } from '@coreui/react'
import { supabase } from '../../services/supabaseClient'

const Agregar = () => {
  const [formData, setFormData] = useState({
    numeroProducto: '',
    marca: '',
    modelo: '',
    tipo: '',
    numeroSerial: '',
    cantidad: '',
    precio: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase
      .from('inventario')
      .insert([
        {
          numero_producto: formData.numeroProducto,
          marca: formData.marca,
          modelo: formData.modelo,
          tipo: formData.tipo,
          numero_serial: formData.numeroSerial || null,
          cantidad: parseInt(formData.cantidad),
          precio: parseFloat(formData.precio)
        }
      ])

    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Producto agregado con éxito')
      setFormData({
        numeroProducto: '', marca: '', modelo: '', tipo: '',
        numeroSerial: '', cantidad: '', precio: ''
      })
    }
  }

  return (
    <CCard>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CFormInput className="mb-3" label="Número de Producto *" required value={formData.numeroProducto} onChange={(e) => setFormData({...formData, numeroProducto: e.target.value})} />
          <CFormInput className="mb-3" label="Marca *" required value={formData.marca} onChange={(e) => setFormData({...formData, marca: e.target.value})} />
          <CFormInput className="mb-3" label="Modelo *" required value={formData.modelo} onChange={(e) => setFormData({...formData, modelo: e.target.value})} />
          
          <CFormSelect 
            className="mb-3" 
            label="Tipo *" 
            required 
            value={formData.tipo} 
            onChange={(e) => setFormData({...formData, tipo: e.target.value})}
          >
            <option value="">Seleccione un tipo</option>
            <option value="Guitarra Electrica">Guitarra Electrica</option>
            <option value="Guitarra Electro Acustica">Guitarra Electro Acustica</option>
            <option value="Guitarra Acustica">Guitarra Acustica</option>
            <option value="Bajo 4 Cuerdas">Bajo 4 Cuerdas</option>
            <option value="Bajo 5 cuerdas">Bajo 5 cuerdas</option>
            <option value="Bajo 6 Cuerdas">Bajo 6 Cuerdas</option>
            <option value="Amplificador Guitarra">Amplificador Guitarra</option>
            <option value="Amplificador Bajo">Amplificador Bajo</option>
            <option value="Pedal Guitarra">Pedal Guitarra</option>
            <option value="Pedal Bajo">Pedal Bajo</option>
            <option value="Multiefectos">Multiefectos</option>
            <option value="Accesorios">Accesorios</option>
          </CFormSelect>

          <CFormInput className="mb-3" label="Número de Serial" value={formData.numeroSerial} onChange={(e) => setFormData({...formData, numeroSerial: e.target.value})} />
          <CFormInput className="mb-3" label="Cantidad en Stock *" required type="number" value={formData.cantidad} onChange={(e) => setFormData({...formData, cantidad: e.target.value})} />
          <CFormInput className="mb-3" label="Precio *" required type="number" value={formData.precio} onChange={(e) => setFormData({...formData, precio: e.target.value})} />
          
          <CButton type="submit" color="primary">Guardar Producto</CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default Agregar