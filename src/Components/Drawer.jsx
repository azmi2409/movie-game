import React from 'react'

const Drawer = ({children}) => {
  return (
    <div className='drawer-content h-full'>
    {children}
    </div>
  )
}

export default Drawer