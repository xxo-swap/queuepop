import React from 'react'

function Header() {
  return (
    <header className='flex justify-between bg-auto bg-blend-color h-50'>
        <div className='text-5xl bg-amber-400'>
            logo
        </div>
        <div>
            <button className='text-4xl p-2'>
                Get Started
            </button>
        </div>
    </header>
  )
}

export default Header