/**
 * Application Routes Configuration
 *
 * Define las rutas protegidas de la aplicación.
 * Se utiliza React.lazy para la carga diferida (lazy loading),
 * optimizando el rendimiento mediante la división de código.
 *
 * @module routes
 */

import React from 'react'

// Dashboard
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Cotizaciones (La nueva ruta que faltaba)
const Cotizaciones = React.lazy(() => import('./views/cotizaciones/Cotizaciones'))

// Productos
const Inventario = React.lazy(() => import('./views/productos/Inventario'))
const Agregar = React.lazy(() => import('./views/productos/Agregar'))
const Editar = React.lazy(() => import('./views/productos/Editar'))

/**
 * Array de configuración de rutas
 *
 * @type {Array<Object>}
 */
export const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/cotizaciones', name: 'Cotizaciones', element: Cotizaciones },
  
  // Rutas de Productos
  { path: '/productos', name: 'Productos', exact: true },
  { path: '/productos/inventario', name: 'Inventario', element: Inventario },
  { path: '/productos/agregar', name: 'Agregar Producto', element: Agregar },
  { path: '/productos/editar', name: 'Editar/Eliminar Producto', element: Editar },
]

export default routes