import React from 'react'
import { Outlet } from 'react-router-dom'

function DashboardAuthLayout() {
  return (
    <div>
       <Outlet /> 
    </div>
  )
}

export default DashboardAuthLayout