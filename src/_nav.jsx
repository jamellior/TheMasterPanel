import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilPuzzle,
  cilBasket,
  cilChart,
  cilEnvelopeOpen, // <--- Este es el icono que faltaba importar
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Gestión Principal',
  },
  {
    component: CNavGroup,
    name: 'Menu Principal',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Cotizaciones',
        to: '/cotizaciones',
        icon: <CIcon icon={cilEnvelopeOpen} customClassName="nav-icon" />,
      },
      {
        component: CNavGroup,
        name: 'Productos',
        icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Inventario',
            to: '/productos/inventario',
          },
          {
            component: CNavItem,
            name: 'Agregar',
            to: '/productos/agregar',
          },
          {
            component: CNavItem,
            name: 'Editar/Eliminar',
            to: '/productos/editar',
          },
        ],
      },
    ],
  },
]

export default _nav